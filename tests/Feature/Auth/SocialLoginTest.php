<?php

declare(strict_types=1);

use App\Models\SocialiteProvider;
use App\Models\User;
use Illuminate\Testing\TestResponse;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

beforeEach(function () {
    config('roles.models.role')::create([
        'name' => 'User',
        'slug' => 'user',
        'description' => 'User Role',
        'level' => 1,
    ]);
});

/**
 * Start a sign in through the redirect endpoint and return the state it sent to the provider.
 */
function socialLoginState(string $provider, ?User $signedInUser = null): string
{
    if ($signedInUser) {
        test()->withToken($signedInUser->createToken('session')->plainTextToken);
    }

    $url = test()->postJson("/api/oauth/{$provider}")->assertOk()->json('url');

    test()->withoutToken();

    parse_str((string) parse_url($url, PHP_URL_QUERY), $query);

    return $query['state'];
}

/**
 * Fake the provider so the callback receives the given raw user payload.
 */
function fakeSocialiteUser(string $provider, array $raw): void
{
    Socialite::fake($provider, (new SocialiteUser)->setRaw($raw)->map([
        'id' => $raw['sub'] ?? $raw['id'] ?? null,
        'nickname' => $raw['login'] ?? null,
        'name' => $raw['name'] ?? null,
        'email' => $raw['email'] ?? null,
    ]));
}

function socialCallback(string $provider, ?string $state): TestResponse
{
    return test()->get("/api/oauth/{$provider}/callback".($state === null ? '' : '?state='.$state));
}

it('logs in the user already linked to the provider account', function () {
    $user = User::factory()->create();
    $user->socialiteProviders()->create(['provider' => 'google', 'provider_user_id' => 'google-123']);
    $other = User::factory()->create();
    $state = socialLoginState('google');

    fakeSocialiteUser('google', [
        'sub' => 'google-123',
        'name' => 'Linked Person',
        'email' => $other->email,
        'email_verified' => false,
    ]);

    $response = socialCallback('google', $state);

    $response->assertOk();
    expect($response->viewData('error'))->toBeNull();
    expect(PersonalAccessToken::findToken($response->viewData('token'))->tokenable->is($user))->toBeTrue();
    $this->assertAuthenticatedAs($user);
});

it('refuses an unverified email that matches an existing user', function () {
    $user = User::factory()->create();
    $state = socialLoginState('google');

    fakeSocialiteUser('google', [
        'sub' => 'google-456',
        'name' => 'Attacker',
        'email' => $user->email,
        'email_verified' => false,
    ]);

    $response = socialCallback('google', $state);

    $response->assertStatus(409)->assertSee(__('auth.social_account_exists'), false);
    expect($response->viewData('token'))->toBeNull();
    expect($response->viewData('error'))->toBe(__('auth.social_account_exists'));
    $this->assertGuest();
    expect(PersonalAccessToken::count())->toBe(0);
    expect(SocialiteProvider::count())->toBe(0);
    expect(User::count())->toBe(1);
});

it('treats a provider without an email verification claim as unverified', function () {
    $user = User::factory()->create();
    $state = socialLoginState('facebook');

    fakeSocialiteUser('facebook', [
        'id' => 'fb-789',
        'name' => 'Attacker',
        'email' => $user->email,
        'verified' => true,
    ]);

    $response = socialCallback('facebook', $state);

    $response->assertStatus(409);
    $this->assertGuest();
    expect(PersonalAccessToken::count())->toBe(0);
    expect(SocialiteProvider::count())->toBe(0);
});

it('refuses a verified provider email when the local account never verified it', function () {
    $user = User::factory()->unverified()->create();
    $state = socialLoginState('google');

    fakeSocialiteUser('google', [
        'sub' => 'google-456',
        'name' => 'Same Email',
        'email' => $user->email,
        'email_verified' => true,
    ]);

    $response = socialCallback('google', $state);

    $response->assertStatus(409);
    expect($response->viewData('error'))->toBe(__('auth.social_account_exists'));
    $this->assertGuest();
    expect(PersonalAccessToken::count())->toBe(0);
    expect(SocialiteProvider::count())->toBe(0);
});

it('links and logs in when the provider verified the matching email', function (string $provider, array $claims) {
    $user = User::factory()->create();
    $state = socialLoginState($provider);

    fakeSocialiteUser($provider, [
        'sub' => 'provider-456',
        'name' => 'Same Person',
        'email' => $user->email,
    ] + $claims);

    $response = socialCallback($provider, $state);

    $response->assertOk();
    expect(PersonalAccessToken::findToken($response->viewData('token'))->tokenable->is($user))->toBeTrue();
    $this->assertAuthenticatedAs($user);
    expect($user->socialiteProviders()->where('provider', $provider)->where('provider_user_id', 'provider-456')->exists())->toBeTrue();
    expect(User::count())->toBe(1);
})->with([
    'google' => ['google', ['email_verified' => true]],
    'linkedin' => ['linkedin', ['email_verified' => true]],
    'apple' => ['apple', ['email_verified' => 'true']],
]);

it('links GitHub when the email was resolved through the user:email scope', function () {
    $user = User::factory()->create();
    $state = socialLoginState('github');

    fakeSocialiteUser('github', [
        'id' => 4242,
        'login' => 'octocat',
        'name' => 'Same Person',
        'email' => $user->email,
    ]);

    $response = socialCallback('github', $state);

    $response->assertOk();
    $this->assertAuthenticatedAs($user);
    expect($user->socialiteProviders()->where('provider', 'github')->where('provider_user_id', '4242')->exists())->toBeTrue();
});

it('refuses GitHub when the email did not come through the user:email scope', function () {
    $user = User::factory()->create();
    $state = socialLoginState('github');

    fakeSocialiteUser('github', [
        'id' => 4242,
        'login' => 'octocat',
        'name' => 'Attacker',
        'email' => $user->email,
    ]);
    Socialite::driver('github')->setScopes([]);

    $response = socialCallback('github', $state);

    $response->assertStatus(409);
    $this->assertGuest();
    expect(SocialiteProvider::count())->toBe(0);
});

it('never matches a local user by email when the provider returns no email', function (?string $email) {
    $existing = User::factory()->create(['email' => '']);
    $state = socialLoginState('google');

    fakeSocialiteUser('google', [
        'sub' => 'google-999',
        'name' => 'No Email',
        'email' => $email,
        'email_verified' => true,
    ]);

    $response = socialCallback('google', $state);

    $response->assertOk();
    $this->assertAuthenticated();
    expect(auth()->id())->not->toBe($existing->id);
    expect(User::count())->toBe(2);
    expect($existing->socialiteProviders()->count())->toBe(0);
    expect(SocialiteProvider::where('user_id', auth()->id())->where('provider_user_id', 'google-999')->exists())->toBeTrue();
})->with([
    'null' => [null],
    'blank' => [''],
]);

it('creates and logs in a brand new user', function () {
    $state = socialLoginState('google');

    fakeSocialiteUser('google', [
        'sub' => 'google-111',
        'name' => 'New Person',
        'email' => 'new.person@example.com',
        'email_verified' => true,
    ]);

    $response = socialCallback('google', $state);

    $response->assertOk();
    $user = User::firstWhere('email', 'new.person@example.com');
    expect($user)->not->toBeNull();
    expect($user->name)->toBe('New Person');
    expect(PersonalAccessToken::findToken($response->viewData('token'))->tokenable->is($user))->toBeTrue();
    $this->assertAuthenticatedAs($user);
    expect($user->socialiteProviders()->where('provider', 'google')->where('provider_user_id', 'google-111')->exists())->toBeTrue();
});

it('rejects a callback without a state the app issued', function (?string $state) {
    fakeSocialiteUser('google', [
        'sub' => 'google-111',
        'name' => 'New Person',
        'email' => 'new.person@example.com',
        'email_verified' => true,
    ]);

    $response = socialCallback('google', $state);

    $response->assertForbidden();
    expect($response->viewData('token'))->toBeNull();
    expect($response->viewData('error'))->toBe(__('auth.social_invalid_state'));
    $this->assertGuest();
    expect(User::count())->toBe(0);
})->with([
    'missing' => [null],
    'unknown' => ['not-a-state-the-app-issued'],
]);

it('accepts a state only once', function () {
    $state = socialLoginState('google');

    fakeSocialiteUser('google', [
        'sub' => 'google-111',
        'name' => 'New Person',
        'email' => 'new.person@example.com',
        'email_verified' => true,
    ]);

    socialCallback('google', $state)->assertOk();
    auth()->logout();

    socialCallback('google', $state)->assertForbidden();
    $this->assertGuest();
});

it('rejects a state issued for a different provider', function () {
    $state = socialLoginState('github');

    fakeSocialiteUser('google', [
        'sub' => 'google-111',
        'name' => 'New Person',
        'email' => 'new.person@example.com',
        'email_verified' => true,
    ]);

    socialCallback('google', $state)->assertForbidden();
    $this->assertGuest();
    expect(User::count())->toBe(0);
});

it('carries the state through the StackExchange redirect', function () {
    $state = socialLoginState('stackexchange');

    fakeSocialiteUser('stackexchange', [
        'id' => 'se-1',
        'name' => 'Stack Person',
    ]);

    socialCallback('stackexchange', $state)->assertOk();
    $this->assertAuthenticated();
});

it('links the provider to the signed in user who started the connection', function () {
    $user = User::factory()->create();
    $state = socialLoginState('github', $user);

    fakeSocialiteUser('github', [
        'id' => 4242,
        'login' => 'octocat',
        'name' => 'Someone Else',
        'email' => 'someone.else@example.com',
    ]);

    $response = socialCallback('github', $state);

    $response->assertOk();
    $this->assertAuthenticatedAs($user);
    expect($user->socialiteProviders()->where('provider', 'github')->where('provider_user_id', '4242')->exists())->toBeTrue();
    expect(User::count())->toBe(1);
});

it('refuses to link a provider account that belongs to another user', function () {
    $owner = User::factory()->create();
    $owner->socialiteProviders()->create(['provider' => 'github', 'provider_user_id' => '4242']);
    $user = User::factory()->create();
    $state = socialLoginState('github', $user);

    fakeSocialiteUser('github', [
        'id' => 4242,
        'login' => 'octocat',
        'name' => 'Someone Else',
        'email' => 'someone.else@example.com',
    ]);

    $response = socialCallback('github', $state);

    $response->assertStatus(409);
    expect($response->viewData('token'))->toBe('cannot_add');
    $this->assertGuest();
    expect($user->socialiteProviders()->count())->toBe(0);
});

it('requires authentication to revoke a provider', function () {
    $user = User::factory()->create();
    $provider = $user->socialiteProviders()->create(['provider' => 'github', 'provider_user_id' => '4242']);

    $this->postJson("/api/oauth-revoke/{$provider->id}")->assertUnauthorized();

    $this->assertModelExists($provider);
});

it('lets a signed in user revoke their own provider', function () {
    $user = User::factory()->create();
    $provider = $user->socialiteProviders()->create(['provider' => 'github', 'provider_user_id' => '4242']);
    Sanctum::actingAs($user);

    $this->postJson("/api/oauth-revoke/{$provider->id}")->assertOk()->assertJsonPath('status', 'success');

    $this->assertModelMissing($provider);
});
