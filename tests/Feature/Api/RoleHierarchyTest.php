<?php

declare(strict_types=1);

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;

beforeEach(function () {
    $this->superAdminRole = rankedRole('superadmin', 5);
    $this->adminRole = rankedRole('admin', 4);
    $this->moderatorRole = rankedRole('moderator', 3);
});

function rankedRole(string $slug, int $level): Role
{
    return Role::create([
        'name' => Str::headline($slug),
        'slug' => $slug,
        'description' => '',
        'level' => $level,
    ]);
}

function userWithRole(Role $role): User
{
    $user = User::factory()->create();
    $user->attachRole($role);

    return $user;
}

/**
 * Sign in as a user holding the given role and permissions.
 */
function signInWithRole(Role $role, string ...$permissions): User
{
    $user = userWithRole($role);

    foreach ($permissions as $slug) {
        $user->attachPermission(Permission::create([
            'name' => $slug,
            'slug' => $slug,
            'description' => '',
            'model' => 'Permission',
        ]));
    }

    return Sanctum::actingAs($user);
}

/**
 * @param  array<int, int>  $roles
 * @param  array<string, mixed>  $overrides
 * @return array<string, mixed>
 */
function userUpdatePayload(User $user, array $roles, array $overrides = []): array
{
    return [
        'name' => $user->name,
        'email' => $user->email,
        'roles' => $roles,
        'permissions' => [],
        ...$overrides,
    ];
}

/**
 * @param  array<string, mixed>  $overrides
 * @return array<string, mixed>
 */
function rolePayload(Role $role, array $overrides = []): array
{
    return [
        'name' => $role->name,
        'slug' => $role->slug,
        'description' => $role->description,
        'level' => $role->level,
        'permissions' => [],
        ...$overrides,
    ];
}

it('refuses to let an admin give itself super admin', function () {
    $admin = signInWithRole($this->adminRole, 'edit.users');

    $this->patchJson(
        "/api/users/update-user/{$admin->id}",
        userUpdatePayload($admin, [$this->adminRole->id, $this->superAdminRole->id]),
    )->assertUnprocessable()->assertJsonValidationErrors('roles.1');

    expect($admin->fresh()->hasRole('superadmin'))->toBeFalse();
});

it('lets an admin assign roles up to its own level', function () {
    signInWithRole($this->adminRole, 'edit.users');
    $moderator = userWithRole($this->moderatorRole);

    $this->patchJson(
        "/api/users/update-user/{$moderator->id}",
        userUpdatePayload($moderator, [$this->adminRole->id]),
    )->assertOk();

    expect($moderator->fresh()->hasRole('admin'))->toBeTrue();
});

it('lets a super admin assign super admin', function () {
    signInWithRole($this->superAdminRole, 'edit.users');
    $admin = userWithRole($this->adminRole);

    $this->patchJson(
        "/api/users/update-user/{$admin->id}",
        userUpdatePayload($admin, [$this->superAdminRole->id]),
    )->assertOk();

    expect($admin->fresh()->hasRole('superadmin'))->toBeTrue();
});

it('refuses to let an admin edit a super admin account', function () {
    signInWithRole($this->adminRole, 'edit.users');
    $superAdmin = userWithRole($this->superAdminRole);

    $this->patchJson(
        "/api/users/update-user/{$superAdmin->id}",
        userUpdatePayload($superAdmin, [$this->superAdminRole->id], [
            'password' => 'taken-over',
            'password_confirmation' => 'taken-over',
        ]),
    )->assertForbidden();

    expect($superAdmin->fresh()->password)->toBe($superAdmin->password);
});

it('refuses to let an admin create a super admin', function () {
    signInWithRole($this->adminRole, 'create.users');

    $this->postJson('/api/users/create-user', [
        'name' => 'Second Account',
        'email' => 'second@example.com',
        'password' => 'secret-password',
        'password_confirmation' => 'secret-password',
        'roles' => [$this->superAdminRole->id],
        'permissions' => [],
        'theme_dark' => false,
        'email_verified_at' => true,
    ])->assertUnprocessable()->assertJsonValidationErrors('roles.0');

    $this->assertDatabaseMissing('users', ['email' => 'second@example.com']);
});

it('lets an admin create a user with a role up to its own level', function () {
    signInWithRole($this->adminRole, 'create.users');

    $this->postJson('/api/users/create-user', [
        'name' => 'Second Account',
        'email' => 'second@example.com',
        'password' => 'secret-password',
        'password_confirmation' => 'secret-password',
        'roles' => [$this->adminRole->id],
        'permissions' => [],
        'theme_dark' => false,
        'email_verified_at' => true,
    ])->assertOk();

    expect(User::whereEmail('second@example.com')->first()->hasRole('admin'))->toBeTrue();
});

it('refuses to let an admin delete a super admin account', function () {
    signInWithRole($this->adminRole, 'delete.users');
    $superAdmin = userWithRole($this->superAdminRole);

    $this->deleteJson("/api/users/delete/user/{$superAdmin->id}")->assertForbidden();

    $this->assertNotSoftDeleted($superAdmin);
});

it('refuses to let an admin change verification on a super admin account', function () {
    signInWithRole($this->adminRole, 'edit.users');
    $superAdmin = userWithRole($this->superAdminRole);

    $this->postJson('/api/users/toggle-verify', [
        'user' => ['id' => $superAdmin->id],
        'action' => 'unVerifyUser',
    ])->assertForbidden();

    expect($superAdmin->fresh()->email_verified_at)->not->toBeNull();
});

it('refuses to let an admin raise a role above its own level', function () {
    signInWithRole($this->adminRole, 'edit.roles');

    $this->patchJson(
        "/api/roles/update-role/{$this->adminRole->id}",
        rolePayload($this->adminRole, ['level' => 5]),
    )->assertUnprocessable()->assertJsonValidationErrors('level');

    expect($this->adminRole->fresh()->level)->toBe(4);
});

it('refuses to let an admin edit the super admin role', function () {
    signInWithRole($this->adminRole, 'edit.roles');

    $this->patchJson(
        "/api/roles/update-role/{$this->superAdminRole->id}",
        rolePayload($this->superAdminRole, ['slug' => 'former-superadmin']),
    )->assertForbidden();

    expect($this->superAdminRole->fresh()->slug)->toBe('superadmin');
});

it('lets an admin edit a role up to its own level', function () {
    signInWithRole($this->adminRole, 'edit.roles');

    $this->patchJson(
        "/api/roles/update-role/{$this->moderatorRole->id}",
        rolePayload($this->moderatorRole, ['level' => 4]),
    )->assertOk();

    expect($this->moderatorRole->fresh()->level)->toBe(4);
});

it('refuses to let an admin create a role above its own level', function () {
    signInWithRole($this->adminRole, 'create.roles');

    $this->postJson('/api/roles/create-role', [
        'name' => 'Owner',
        'slug' => 'owner',
        'description' => '',
        'level' => 6,
        'permissions' => [],
    ])->assertUnprocessable()->assertJsonValidationErrors('level');

    $this->assertDatabaseMissing('roles', ['slug' => 'owner']);
});

it('lets an admin create a role up to its own level', function () {
    signInWithRole($this->adminRole, 'create.roles');

    $this->postJson('/api/roles/create-role', [
        'name' => 'Manager',
        'slug' => 'manager',
        'description' => '',
        'level' => 4,
        'permissions' => [],
    ])->assertOk();

    $this->assertDatabaseHas('roles', ['slug' => 'manager', 'level' => 4]);
});

it('refuses to let an admin delete the super admin role', function () {
    signInWithRole($this->adminRole, 'delete.roles');

    $this->deleteJson("/api/roles/delete/role/{$this->superAdminRole->id}")->assertForbidden();

    $this->assertNotSoftDeleted($this->superAdminRole);
});

function makePermission(string $slug): Permission
{
    return Permission::create([
        'name' => $slug,
        'slug' => $slug,
        'description' => '',
        'model' => 'Permission',
    ]);
}

it('refuses to let a role editor grant a permission it does not hold', function () {
    signInWithRole($this->moderatorRole, 'edit.roles');
    $deleteUsers = makePermission('delete.users');

    $this->patchJson(
        "/api/roles/update-role/{$this->moderatorRole->id}",
        rolePayload($this->moderatorRole, ['permissions' => [$deleteUsers->id]]),
    )->assertUnprocessable()->assertJsonValidationErrors('permissions.0');

    expect($this->moderatorRole->fresh()->permissions)->toBeEmpty();
});

it('lets a role editor grant a permission it holds', function () {
    signInWithRole($this->moderatorRole, 'edit.roles');
    $editRoles = Permission::whereSlug('edit.roles')->first();

    $this->patchJson(
        "/api/roles/update-role/{$this->moderatorRole->id}",
        rolePayload($this->moderatorRole, ['permissions' => [$editRoles->id]]),
    )->assertOk();

    expect($this->moderatorRole->fresh()->permissions->pluck('slug')->all())->toBe(['edit.roles']);
});

it('keeps permissions a role already has when the editor does not hold them', function () {
    signInWithRole($this->moderatorRole, 'edit.roles');
    $reviewerRole = rankedRole('reviewer', 3);
    $deleteUsers = makePermission('delete.users');
    $reviewerRole->attachPermission($deleteUsers);

    $this->patchJson(
        "/api/roles/update-role/{$reviewerRole->id}",
        rolePayload($reviewerRole, ['permissions' => [$deleteUsers->id]]),
    )->assertOk();

    expect($reviewerRole->fresh()->permissions->pluck('slug')->all())->toBe(['delete.users']);
});

it('refuses to let a role creator grant a permission it does not hold', function () {
    signInWithRole($this->moderatorRole, 'create.roles');
    $deleteUsers = makePermission('delete.users');

    $this->postJson('/api/roles/create-role', [
        'name' => 'Helper',
        'slug' => 'helper',
        'description' => '',
        'level' => 3,
        'permissions' => [$deleteUsers->id],
    ])->assertUnprocessable()->assertJsonValidationErrors('permissions.0');

    $this->assertDatabaseMissing('roles', ['slug' => 'helper']);
});

it('lets a super admin grant any permission', function () {
    signInWithRole($this->superAdminRole, 'create.roles');
    $deleteUsers = makePermission('delete.users');

    $this->postJson('/api/roles/create-role', [
        'name' => 'Helper',
        'slug' => 'helper',
        'description' => '',
        'level' => 3,
        'permissions' => [$deleteUsers->id],
    ])->assertOk();

    expect(Role::whereSlug('helper')->first()->permissions->pluck('slug')->all())->toBe(['delete.users']);
});
