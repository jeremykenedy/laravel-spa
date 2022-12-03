<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\SocialProviderDeniedException;
use App\Http\Controllers\Controller;
use App\Models\SocialiteProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Laravel\Socialite\Facades\Socialite;
use App\Traits\SocialiteProvidersTrait;

use Auth;
use Log;

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

        return response()->json([
            'url' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl(),
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
        $userData = $this->findOrCreateUser($provider, $socialUser, true);

        $user = $userData['user'];
        $token = $userData['token'];

        auth()->login($user);

        return view('socialite/callback', [
            'token'         => $token,
            'token_type'    => 'bearer',
        ]);
    }

    /**
     * Revoke a social media login provider for
     * a user from the app and from the provider.
     *
     * @param  \App\Models\SocialiteProvider $provider
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function revokeSocialProvider(SocialiteProvider $provider, Request $request)
    {
        $user = auth('sanctum')->user();

        if($provider->user_id != $user->id) {
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
