<?php

namespace App\Http\Controllers\Auth;

use Abraham\TwitterOAuth\TwitterOAuth;
use App\Exceptions\SocialProviderDeniedException;
use App\Http\Controllers\Controller;
use App\Models\SocialiteProvider;
use App\Traits\SocialiteProvidersTrait;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Crypt;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    use AuthenticatesUsers;
    use SocialiteProvidersTrait;

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

        $url = null;
        $token = null;
        $state = null;
        $user = null;
        $scopes = [];
        $with = [];

        if (auth('sanctum')->check()) {
            $user = auth('sanctum')->user();
        }

        if ($user) {
            $token = $user->createToken($provider.'-user-token')->plainTextToken;
            $state = Crypt::encrypt($token);
        } else {
            $state = Crypt::encrypt(config('app.key'));
        }

        $with = ['state' => $state];

        // https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions/
        if ($provider == 'instagram') {
            $scopes = ['user_profile'];
            $with += ['response_type' => 'code'];
        }

        // https://docs.snap.com/snap-kit/login-kit/Tutorials/web#understand-scopes
        if ($provider == 'snapchat') {
            $scopes = [
                'https://auth.snapchat.com/oauth2/api/user.display_name',
                'https://auth.snapchat.com/oauth2/api/user.external_id',
                'https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar',
            ];
            $with += ['response_type' => 'code'];
        }

        if ($provider == 'tiktok') {
            $scopes = [
                'user.info.basic',
            ];
            $with += ['response_type' => 'code'];
        }

        if ($provider == 'twitter') {
            $url = $this->twitterUserAuthenticationUrl($state);
        } else {
            $url = Socialite::driver($provider)
                        ->stateless()
                        ->with($with)
                        ->scopes($scopes)
                        ->redirect()
                        ->getTargetUrl();
        }

        if ($provider == 'stackexchange') {
            $url = $this->cacheStatePutKeyInUrl($url, $state);
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
            throw new SocialProviderDeniedException();
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

        $providerFound = SocialiteProvider::where('provider', $provider)
                            ->where('user_id', $user->id)
                            ->first();

        if ($providerFound) {
            $providerFound->updated_at = now();
            $providerFound->save();
        }

        return view('socialite/callback', [
            'token'         => $token,
            'token_type'    => 'bearer',
        ]);
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

        $tempId = $this->generateTempId();
        $requestToken = $connection->oauth('oauth/request_token', [
            'oauth_callback' => $consumerRedirect.'?state='.$tempId,
        ]);

        $this->tempStoreStateInCache($tempId, $state);

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
