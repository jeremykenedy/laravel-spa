<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\SocialProviderDeniedException;
use App\Http\Controllers\Controller;
use App\Models\SocialiteProvider;
use App\Traits\SocialiteProvidersTrait;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
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
    public function getSocialRedirect(string $provider, Request $request)
    {
        $providerKey = Config::get('services.'.$provider);

        if (empty($providerKey)) {
            abort(419);
        }

        $state = Crypt::encrypt(config('app.key'));
        $user = auth('sanctum')->user();

        if ($user) {
            $token = $user->createToken($provider.'-user-token')->plainTextToken;
            $state = Crypt::encrypt($token);
        }

        return response()->json([
            'url' => Socialite::driver($provider)->stateless()->with([
                'state' => $state,
            ])->redirect()->getTargetUrl(),
        ]);
    }

    /**
     * Gets the social handle information from the provider.
     *
     * @param  string  $provider  The provider
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function handleSocialCallback(string $provider, Request $request)
    {
        $denied = $request->denied ? $request->denied : null;
        if ($denied != null || $denied != '') {
            throw new SocialProviderDeniedException;
        }

        $socialUser = Socialite::driver($provider)->stateless()->user();
        $state = $request->state ? Crypt::decrypt($request->state) : null;
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
