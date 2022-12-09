<?php

use App\Http\Controllers\Controller;
use App\Services\AppleToken;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function handleCallback(AppleToken $appleToken)
    {
        config()->set('services.apple.client_secret', $appleToken->generate());

        $socialUser = Socialite::driver('apple')
            ->stateless()
            ->user();

        // Further actions you want to take in your app...
    }
}
