<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            'SocialiteProviders\\Facebook\\FacebookExtendSocialite@handle',
            'SocialiteProviders\\Twitter\\TwitterExtendSocialite@handle',
            'SocialiteProviders\\Instagram\\InstagramExtendSocialite@handle',
            // 'SocialiteProviders\\InstagramBasic\\InstagramBasicExtendSocialite@handle',
            'SocialiteProviders\\GitHub\\GitHubExtendSocialite@handle',
            'SocialiteProviders\\YouTube\\YouTubeExtendSocialite@handle',
            'SocialiteProviders\\Google\\GoogleExtendSocialite@handle',
            'SocialiteProviders\\LinkedIn\\LinkedInExtendSocialite@handle',
            'SocialiteProviders\\Twitch\\TwitchExtendSocialite@handle',
            'SocialiteProviders\\Apple\\AppleExtendSocialite@handle',
            'SocialiteProviders\\Microsoft\\MicrosoftExtendSocialite@handle',
            'SocialiteProviders\\TikTok\\TikTokExtendSocialite@handle',
            'SocialiteProviders\\Zoho\\ZohoExtendSocialite@handle',
            'SocialiteProviders\\StackExchange\\StackExchangeExtendSocialite@handle',
            'SocialiteProviders\\GitLab\\GitLabExtendSocialite@handle',
            'SocialiteProviders\\Reddit\\RedditExtendSocialite@handle',
            'SocialiteProviders\\Snapchat\\SnapchatExtendSocialite@handle',
            'SocialiteProviders\\Meetup\\MeetupExtendSocialite@handle',
            // 'SocialiteProviders\\Bitbucket\\BitbucketExtendSocialite@handle',
            'SocialiteProviders\\Atlassian\\AtlassianExtendSocialite@handle',

            // 'SocialiteProviders\\Trello\\TrelloExtendSocialite@handle',
            // 'SocialiteProviders\\Zoom\\ZoomExtendSocialite@handle',
            // 'SocialiteProviders\\MailChimp\\MailChimpExtendSocialite@handle',
            // 'SocialiteProviders\\Disqus\\DisqusExtendSocialite@handle',
            // 'SocialiteProviders\\Patreon\\PatreonExtendSocialite@handle',
            // 'SocialiteProviders\\PayPal\\PayPalExtendSocialite@handle',
            // 'SocialiteProviders\\Stripe\\StripeExtendSocialite@handle',
            // 'SocialiteProviders\\Venmo\\VenmoExtendSocialite@handle',
            // 'SocialiteProviders\\SoundCloud\\SoundCloudExtendSocialite@handle',
            // 'SocialiteProviders\\Spotify\\SpotifyExtendSocialite@handle',
            // 'SocialiteProviders\\ArcGIS\\ArcGISExtendSocialite@handle',
            // 'SocialiteProviders\\Fitbit\\FitbitExtendSocialite@handle',
            // 'SocialiteProviders\\Uber\\UberExtendSocialite@handle',
            // 'SocialiteProviders\\Amazon\\AmazonExtendSocialite@handle',
            // 'SocialiteProviders\\ThirtySevenSignals\\ThirtySevenSignalsExtendSocialite@handle',
            // 'SocialiteProviders\\Keycloak\\KeycloakExtendSocialite@handle',
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

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
