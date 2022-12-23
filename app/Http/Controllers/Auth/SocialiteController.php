<?php

namespace App\Http\Controllers\Auth;

use Abraham\TwitterOAuth\TwitterOAuth;
use App\Exceptions\SocialProviderDeniedException;
use App\Http\Controllers\Controller;
use App\Models\SocialiteProvider;
use App\Traits\SocialiteProvidersTrait;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    use AuthenticatesUsers, SocialiteProvidersTrait;

    private $providerSettings;
    private $providerConfigs;

    public function __construct()
    {
        $this->setupProviders();

        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    public function guard($guard = 'web')
    {
        return Auth::guard($guard);
    }

    /**
     * Get a list of enabled socialite logins.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function loginsEnabled(Request $request)
    {
        return response()->json([
            'logins' => $this->loginsList(),
        ]);
    }

    /**
     * Gets the social redirect.
     *
     * @param  string  $provider  The provider
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getSocialRedirect(Request $request, string $provider)
    {
        $providerKey = Config::get('services.'.$provider);

        if (empty($providerKey)) {
            abort(419);
        }
        $user = null;

        if (auth('sanctum')->check()) {
            $user = auth('sanctum')->user();
        }

        if ($user) {
            $token = $user->createToken($provider.'-user-token')->plainTextToken;
            $state = Crypt::encrypt($token);
        } else {
            $state = Crypt::encrypt(config('app.key'));
        }

        if ($provider == 'twitter') {
            $url = $this->twitterUserAuthenticationUrl($state);
        } elseif ($provider == 'stackexchange') {
            $url = $this->stackexchangeUserAuthenticationUrl($state);
        } else {
            $url = Socialite::driver($provider)->stateless()->with([
                'state' => $state,
            ])->redirect()->getTargetUrl();
        }

        return response()->json([
            'url' => $url,
        ]);
    }

    /**
     * Gets the social handle information from the provider.
     *
     * @param  string  $provider  The provider
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function handleSocialCallback(Request $request, string $provider)
    {
        $denied = $request->denied ? $request->denied : null;
        if ($denied != null || $denied != '') {
            throw new SocialProviderDeniedException;
        }

        if ($provider == 'twitter') {
            $socialUser = $this->twitterUserAuthentication($request);
            $state = $request->state ? Crypt::decrypt(Cache::pull($request->state)) : null;
        } elseif ($provider == 'stackexchange') {
            $socialUser = Socialite::driver($provider)->stateless()->user();
            $state = $request->state ? Crypt::decrypt(Cache::pull($request->state)) : null;
        } else {
            $socialUser = Socialite::driver($provider)->stateless()->user();
            $state = $request->state ? Crypt::decrypt($request->state) : null;
        }

        $userData = $this->findOrCreateUser($provider, $socialUser, $state);

        $user = $userData['user'];
        $token = $userData['token'];

        if ($user && $token) {
            auth()->login($user);
        } else {
            $token = 'cannot_add';
        }

        return view('socialite/callback', [
            'token'         => $token,
            'token_type'    => 'bearer',
        ]);
    }

    /**
     * Get Stack Echange Oauth2 URL with local app identifier if user logged in.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function stackexchangeUserAuthenticationUrl($state = null)
    {
        $consumerRedirect = config('services.stackexchange.redirect');

        $tempId = str_random(40);
        Cache::put($tempId, $state, 60);

        $url = Socialite::driver('stackexchange')->stateless()->with([
            'state' => $state,
        ])
                    ->scopes([])
                    ->redirect()
                    ->getTargetUrl();

        return $url.'&state='.$tempId;
    }

    /**
     * Get Twitter Oauth1.0 Url built with identifier if user is present.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function twitterUserAuthenticationUrl($state = null)
    {
        $consumerKey = config('services.twitter.client_id');
        $consumerSecret = config('services.twitter.client_secret');
        $consumerRedirect = config('services.twitter.redirect');

        $connection = new TwitterOAuth($consumerKey, $consumerSecret);

        $tempId = str_random(40);
        $requestToken = $connection->oauth('oauth/request_token', [
            'oauth_callback' => $consumerRedirect.'?state='.$tempId,
        ]);

        Cache::put($tempId, $state, 60);

        $url = $connection->url('oauth/authorize', [
            'oauth_token' => $requestToken['oauth_token'],
        ]);

        return $url;
    }

    /**
     * Get Twitter user credentials from Oauth1.0.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function twitterUserAuthentication(Request $request)
    {
        $consumerKey = config('services.twitter.client_id');
        $consumerSecret = config('services.twitter.client_secret');
        $consumerRedirect = config('services.twitter.redirect');

        $connection = new TwitterOAuth($consumerKey, $consumerSecret, $request->oauth_token);

        $access_token = $connection->oauth('oauth/access_token', [
            'oauth_verifier'    => $request->oauth_verifier,
            'oauth_token'       => $request->oauth_token,
        ]);

        $connection = new TwitterOAuth($consumerKey, $consumerSecret, $access_token['oauth_token'], $access_token['oauth_token_secret']);

        return $connection->get('account/verify_credentials', [
            'include_email'     => true,
            'skip_status'       => true,
            'include_entities'  => false,
        ]);
    }

    /**
     * Revoke a social media login provider for
     * a user from the app and from the provider.
     *
     * @param  \App\Models\SocialiteProvider  $provider
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function revokeSocialProvider(SocialiteProvider $provider, Request $request)
    {
        $user = auth('sanctum')->user();

        if ($provider->user_id != $user->id) {
            abort(403);
        }

        $provider->delete();

        return response()->json([
            'status'    => 'success',
            'provider'  => $provider,
            'user'      => $user,
        ]);
    }
}
