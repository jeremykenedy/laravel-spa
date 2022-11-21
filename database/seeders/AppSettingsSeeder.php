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
                'val'       => '',
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
                'val'       => url('social/handle/facebook'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Twitter Login Enabled',
                'key'       => 'enableTwitterLogin',
                'val'       => false,
                'type'      => 'boolean',
                'group'     => 'auth',
            ],
            [
                'key'       => 'appTwitterId',
                'name'      => 'App Twitter Id',
                'val'       => '',
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
                'val'       => url('social/handle/twitter'),
                'group'     => 'auth',
            ],
            [
                'name'      => 'App Google Login Enabled',
                'key'       => 'enableGoogleLogin',
                'type'      => 'boolean',
                'val'       => false,
                'group'     => 'auth',
            ],
            [
                'key'       => 'appGoogleId',
                'name'      => 'App Google Id',
                'val'       => '',
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
                'val'       => url('social/handle/google'),
                'group'     => 'auth',
            ],
            // [
            //     'name'      => 'App Google Analytics Enabled',
            //     'key'       => 'enableGoogleAnalytics',
            //     'type'      => 'boolean',
            //     'val'       => false,
            //     'group'     => 'analytics'
            // ],
            // [
            //     'name'      => 'App Google Analytics Key',
            //     'key'       => 'appGoogleAnalyticsKey',
            //     'val'       => null,
            //     'group'     => 'analytics'
            // ],
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
