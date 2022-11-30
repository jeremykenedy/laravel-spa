<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            'SocialiteProviders\\Facebook\\FacebookExtendSocialite@handle',
            'SocialiteProviders\\Twitter\\TwitterExtendSocialite@handle',
            'SocialiteProviders\\Instagram\\InstagramExtendSocialite@handle',
            'SocialiteProviders\\GitHub\\GitHubExtendSocialite@handle',
            'SocialiteProviders\\YouTube\\YouTubeExtendSocialite@handle',
            'SocialiteProviders\\Google\\GoogleExtendSocialite@handle',
            'SocialiteProviders\\LinkedIn\\LinkedInExtendSocialite@handle',
            'SocialiteProviders\\Twitch\\TwitchExtendSocialite@handle',
            'SocialiteProviders\\Apple\\AppleExtendSocialite@handle',
            'SocialiteProviders\\Microsoft\\MicrosoftExtendSocialite@handle',
            'SocialiteProviders\\TikTok\\TikTokExtendSocialite@handle',
            // 'SocialiteProviders\\ThirtySevenSignals\\ThirtySevenSignalsExtendSocialite@handle',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
