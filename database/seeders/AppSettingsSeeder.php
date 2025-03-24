<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use QCod\Settings\Setting\Setting;

class AppSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            [
                'name'      => 'App Facebook Login',
                'key'       => 'enableFbLogin',
                'val'       => config('services.facebook.enabled'),
                'type'      => 'boolean',
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Facebook Id',
                'key'       => 'appFbId',
                'val'       => config('services.facebook.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Facebook Secret',
                'key'       => 'appFbSecret',
                'val'       => config('services.facebook.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Facebook Redirect',
                'key'       => 'appFbRedirect',
                'val'       => url('api/oauth/facebook/callback'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Twitter Login',
                'key'       => 'enableTwitterLogin',
                'val'       => config('services.twitter.enabled'),
                'type'      => 'boolean',
                'group'     => 'auth',
            ],
            [
                'key'       => 'appTwitterId',
                'name'      => 'App Twitter Id',
                'val'       => config('services.twitter.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Twitter Secret',
                'key'       => 'appTwitterSecret',
                'val'       => config('services.twitter.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Twitter Redirect',
                'key'       => 'appTwitterRedirect',
                'val'       => url('api/oauth/twitter/callback'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App GitHub Login',
                'key'       => 'enableGitHubLogin',
                'val'       => config('services.github.enabled'),
                'type'      => 'boolean',
                'group'     => 'auth',
            ],
            [
                'key'       => 'appGitHubId',
                'name'      => 'App Github Id',
                'val'       => config('services.github.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App GitHub Secret',
                'key'       => 'appGitHubSecret',
                'val'       => config('services.github.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App GitHub Redirect',
                'key'       => 'appGitHubRedirect',
                'val'       => url('api/oauth/github/callback'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Twitch Login',
                'key'       => 'enableTwitchLogin',
                'val'       => config('services.twitch.enabled'),
                'type'      => 'boolean',
                'group'     => 'auth',
            ],
            [
                'key'       => 'appTwitchId',
                'name'      => 'App Twitch Id',
                'val'       => config('services.twitch.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Twitch Secret',
                'key'       => 'appTwitchSecret',
                'val'       => config('services.twitch.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Twitch Redirect',
                'key'       => 'appTwitchRedirect',
                'val'       => url('api/oauth/twitch/callback'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Google Login',
                'key'       => 'enableGoogleLogin',
                'type'      => 'boolean',
                'val'       => config('services.google.enabled'),
                'group'     => 'auth',
            ],
            [
                'key'       => 'appGoogleId',
                'name'      => 'App Google Id',
                'val'       => config('services.google.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Google Secret',
                'key'       => 'appGoogleSecret',
                'val'       => config('services.google.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Google Redirect',
                'key'       => 'appGoogleRedirect',
                'val'       => url('api/oauth/google/callback'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Instagram Login',
                'key'       => 'enableInstagramLogin',
                'type'      => 'boolean',
                'val'       => config('services.instagram.enabled'),
                'group'     => 'auth',
            ],
            [
                'key'       => 'appInstagramId',
                'name'      => 'App Instagram Id',
                'val'       => config('services.instagram.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Instagram Secret',
                'key'       => 'appInstagramSecret',
                'val'       => config('services.instagram.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Instagram Redirect',
                'key'       => 'appInstagramRedirect',
                'val'       => url('api/oauth/instagram/callback'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App YouTube Login',
                'key'       => 'enableYouTubeLogin',
                'type'      => 'boolean',
                'val'       => config('services.youtube.enabled'),
                'group'     => 'auth',
            ],
            [
                'key'       => 'appYouTubeId',
                'name'      => 'App YouTube Id',
                'val'       => config('services.youtube.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App YouTube Secret',
                'key'       => 'appYouTubeSecret',
                'val'       => config('services.youtube.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App YouTube Redirect',
                'key'       => 'appYouTubeRedirect',
                'val'       => url('api/oauth/youtube/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App LinkedIn Login',
                'key'       => 'enableLinkedInLogin',
                'type'      => 'boolean',
                'val'       => config('services.linkedin.enabled'),
                'group'     => 'auth',
            ],
            [
                'key'       => 'appLinkedInId',
                'name'      => 'App LinkedIn Id',
                'val'       => config('services.linkedin.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App LinkedIn Secret',
                'key'       => 'appLinkedInSecret',
                'val'       => config('services.linkedin.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App LinkedIn Redirect',
                'key'       => 'appLinkedInRedirect',
                'val'       => url('api/oauth/linkedin/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App Apple Login',
                'key'       => 'enableAppleLogin',
                'type'      => 'boolean',
                'val'       => config('services.apple.enabled'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Apple Id',
                'key'       => 'appAppleId',
                'val'       => config('services.apple.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Apple Secret',
                'key'       => 'appAppleSecret',
                'val'       => config('services.apple.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Apple Team Id',
                'key'       => 'appAppleTeamId',
                'val'       => config('services.apple.team_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Apple Key Id',
                'key'       => 'appAppleKeyId',
                'val'       => config('services.apple.key_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Apple Private Key',
                'key'       => 'appApplePrivateKey',
                'val'       => config('services.apple.private_key'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Apple Redirect',
                'key'       => 'appAppleRedirect',
                'val'       => url('api/oauth/apple/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App Microsoft Login',
                'key'       => 'enableMicrosoftLogin',
                'type'      => 'boolean',
                'val'       => config('services.microsoft.enabled'),
                'group'     => 'auth',
            ],
            [
                'key'       => 'appMicrosoftId',
                'name'      => 'App Microsoft Id',
                'val'       => config('services.microsoft.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Microsoft Secret',
                'key'       => 'appMicrosoftSecret',
                'val'       => config('services.microsoft.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Microsoft Redirect',
                'key'       => 'appMicrosoftRedirect',
                'val'       => url('api/oauth/microsoft/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App TikTok Login',
                'key'       => 'enableTikTokLogin',
                'type'      => 'boolean',
                'val'       => config('services.tiktok.enabled'),
                'group'     => 'auth',
            ],
            [
                'key'       => 'appTikTokId',
                'name'      => 'App TikTok Id',
                'val'       => config('services.tiktok.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App TikTok Secret',
                'key'       => 'appTikTokSecret',
                'val'       => config('services.tiktok.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App TikTok Redirect',
                'key'       => 'appTikTokRedirect',
                'val'       => url('api/oauth/tiktok/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App ZoHo Login',
                'key'       => 'enableZoHoLogin',
                'type'      => 'boolean',
                'val'       => config('services.zoho.enabled'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App ZoHo Id',
                'key'       => 'appZoHoId',
                'val'       => config('services.zoho.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App ZoHo Secret',
                'key'       => 'appZoHoSecret',
                'val'       => config('services.zoho.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App ZoHo Redirect',
                'key'       => 'appZoHoRedirect',
                'val'       => url('api/oauth/zoho/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App Stack Exchange Login',
                'key'       => 'enableStackExchangeLogin',
                'type'      => 'boolean',
                'val'       => config('services.stackexchange.enabled'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Stack Exchange Id',
                'key'       => 'appStackExchangeId',
                'val'       => config('services.stackexchange.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Stack Exchange Key',
                'key'       => 'appStackExchangeKey',
                'val'       => config('services.stackexchange.key'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Stack Exchange Site',
                'key'       => 'appStackExchangeSite',
                'val'       => config('services.stackexchange.site'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Stack Exchange Secret',
                'key'       => 'appStackExchangeSecret',
                'val'       => config('services.stackexchange.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Stack Exchange Redirect',
                'key'       => 'appStackExchangeRedirect',
                'val'       => url('api/oauth/stackexchange/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App GitLab Login',
                'key'       => 'enableGitLabLogin',
                'type'      => 'boolean',
                'val'       => config('services.gitlab.enabled'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App GitLab Id',
                'key'       => 'appGitLabId',
                'val'       => config('services.gitlab.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App GitLab Secret',
                'key'       => 'appGitLabSecret',
                'val'       => config('services.gitlab.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App GitLab Redirect',
                'key'       => 'appGitLabRedirect',
                'val'       => url('api/oauth/gitlab/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App Reddit Login',
                'key'       => 'enableRedditLogin',
                'type'      => 'boolean',
                'val'       => config('services.reddit.enabled'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Reddit Id',
                'key'       => 'appRedditId',
                'val'       => config('services.reddit.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Reddit Secret',
                'key'       => 'appRedditSecret',
                'val'       => config('services.reddit.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Reddit Response Type',
                'key'       => 'appRedditResponseType',
                'val'       => config('services.reddit.response_type'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Reddit State',
                'key'       => 'appRedditState',
                'val'       => config('services.reddit.state'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Reddit Redirect',
                'key'       => 'appRedditRedirect',
                'val'       => url('api/oauth/reddit/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App Snapchat Login',
                'key'       => 'enableSnapchatLogin',
                'type'      => 'boolean',
                'val'       => config('services.snapchat.enabled'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Snapchat Id',
                'key'       => 'appSnapchatId',
                'val'       => config('services.snapchat.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Snapchat Secret',
                'key'       => 'appSnapchatSecret',
                'val'       => config('services.snapchat.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Snapchat Redirect',
                'key'       => 'appSnapchatRedirect',
                'val'       => url('api/oauth/snapchat/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App Meetup Login',
                'key'       => 'enableMeetupLogin',
                'type'      => 'boolean',
                'val'       => config('services.meetup.enabled'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Meetup Id',
                'key'       => 'appMeetupId',
                'val'       => config('services.meetup.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Meetup Secret',
                'key'       => 'appMeetupSecret',
                'val'       => config('services.meetup.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Meetup Redirect',
                'key'       => 'appMeetupRedirect',
                'val'       => url('api/oauth/meetup/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App Atlassian Login',
                'key'       => 'enableAtlassianLogin',
                'type'      => 'boolean',
                'val'       => config('services.atlassian.enabled'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Atlassian Id',
                'key'       => 'appAtlassianId',
                'val'       => config('services.atlassian.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Atlassian Secret',
                'key'       => 'appAtlassianSecret',
                'val'       => config('services.atlassian.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Atlassian Redirect',
                'key'       => 'appAtlassianRedirect',
                'val'       => url('api/oauth/atlassian/callback'),
                'group'     => 'auth',
            ],

            // NEW_PROVIDER_PLUG :: Put New Provider HERE

            [
                'name'      => 'App Google Analytics',
                'key'       => 'enableGoogleAnalytics',
                'type'      => 'boolean',
                'val'       => config('services.google.gaEnabled'),
                'group'     => 'analytics',
            ],
            [
                'name'      => 'App Google Analytics Key',
                'key'       => 'appGoogleAnalyticsKey',
                'val'       => config('services.google.ga'),
                'group'     => 'analytics',
            ],

            [
                'name'      => 'Sentry.io Monitoring',
                'key'       => 'enableSentryMonitoring',
                'type'      => 'boolean',
                'val'       => config('services.sentry.enabled'),
                'group'     => 'monitoring',
            ],
            [
                'name'      => 'Show exception Feedback form to user',
                'key'       => 'enableSentryMonitoringFeedbakForm',
                'type'      => 'boolean',
                'val'       => config('services.sentry.feedback-enabled'),
                'group'     => 'monitoring',
            ],
            [
                'name'      => 'Sentry.io DSN (url)',
                'key'       => 'sentryIoDSN',
                'val'       => config('sentry.dsn'),
                'group'     => 'monitoring',
            ],

            [
                'name'      => 'App Name',
                'key'       => 'appName',
                'val'       => config('app.name'),
                'group'     => 'app-meta',
            ],
            [
                'name'      => 'Author',
                'key'       => 'author',
                'val'       => 'Jeremy Edgar Kenedy',
                'group'     => 'app-meta',
            ],
            [
                'name'      => 'Description',
                'key'       => 'description',
                'val'       => 'A Laravel + Socialite + Vite + Vue + Tailwind CSS SPA Boilerplate with user authentication, registration, email verification, social media authentication, password recovery, user management, and roles/permissions management. Uses TailwindCSS. While the front end is part of this repository it is a completely separated Vue front end.',
                'group'     => 'app-meta',
            ],
            [
                'name'      => 'Keywords',
                'key'       => 'keywords',
                'val'       => 'framework,laravel,vite,vue3,spa,tailwindcss,auth,authentication,socialite,oauth2',
                'group'     => 'app-meta',
            ],

            [
                'name'      => 'Konami Asteroids',
                'key'       => 'enableKonamiAsteroids',
                'type'      => 'boolean',
                'val'       => config('settings.enableKonamiAsteroids'),
                'group'     => 'secrets',
            ],
            [
                'name'      => 'Konami Toasty',
                'key'       => 'enableKonamiToasty',
                'type'      => 'boolean',
                'val'       => config('settings.enableKonamiToasty'),
                'group'     => 'secrets',
            ],

        ];

        $uniqueKeyOne = 'key';
        $model = new Setting();

        foreach ($items as $item) {
            $found = $model::where($uniqueKeyOne, $item[$uniqueKeyOne])->first();
            if ($found === null) {
                $model::updateOrCreate([
                    $uniqueKeyOne => $item[$uniqueKeyOne],
                ], $item);
            }
        }
    }
}
