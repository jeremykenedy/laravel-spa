<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'val'       => false,
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
                'val'       => '',
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
                'val'       => false,
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
                'val'       => '',
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
                'key'       => 'enableGithubLogin',
                'val'       => false,
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
                'key'       => 'appGithubSecret',
                'val'       => config('services.github.client_secret'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App GitHub Redirect',
                'key'       => 'appGithubRedirect',
                'val'       => url('api/oauth/github/callback'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Twitch Login',
                'key'       => 'enableTwitchLogin',
                'val'       => false,
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
                'val'       => false,
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
                'val'       => '',
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
                'val'       => false,
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
                'val'       => '',
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
                'val'       => false,
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
                'val'       => '',
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
                'val'       => false,
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
                'val'       => '',
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
                'val'       => false,
                'group'     => 'auth',
            ],
            [
                'key'       => 'appAppleId',
                'name'      => 'App Apple Id',
                'val'       => config('services.apple.client_id'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Apple Secret',
                'key'       => 'appAppleSecret',
                'val'       => '',
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
                'val'       => false,
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
                'val'       => '',
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
                'val'       => false,
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
                'val'       => '',
                'group'     => 'auth',
            ],
            [
                'name'      => 'App TikTok Redirect',
                'key'       => 'appTikTokRedirect',
                'val'       => url('api/oauth/tiktok/callback'),
                'group'     => 'auth',
            ],

            [
                'name'      => 'App Google Analytics',
                'key'       => 'enableGoogleAnalytics',
                'type'      => 'boolean',
                'val'       => false,
                'group'     => 'analytics',
            ],
            [
                'name'      => 'App Google Analytics Key',
                'key'       => 'appGoogleAnalyticsKey',
                'val'       => config('services.google.ga'),
                'group'     => 'analytics',
            ],
        ];

        $uniqueKeyOne = 'key';
        $model = new Setting();

        foreach ($items as $item) {
            $model::updateOrCreate([
                $uniqueKeyOne => $item[$uniqueKeyOne],
            ], $item);
        }
    }
}
