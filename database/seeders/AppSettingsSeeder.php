<?php

namespace Database\Seeders;

use \QCod\Settings\Setting\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
                'name'      => 'appFbKey',
                'val'       => '',
                'group'     => 'auth'
            ],
            [
                'name'      => 'enableFbLogin',
                'val'       => true,
                'group'     => 'auth'
            ],
            [
                'name'      => 'appTwitterKey',
                'val'       => '',
                'group'     => 'auth'
            ],
            [
                'name'      => 'enableTwitterLogin',
                'val'       => true,
                'group'     => 'auth'
            ],
            [
                'name'      => 'appInstagramKey',
                'val'       => '',
                'group'     => 'auth'
            ],
            [
                'name'      => 'enableInstagramLogin',
                'val'       => true,
                'group'     => 'auth'
            ],
            [
                'name'      => 'appGoogleKey',
                'val'       => '',
                'group'     => 'auth'
            ],
            [
                'name'      => 'enableGoogleLogin',
                'val'       => true,
                'group'     => 'auth'
            ],
        ];

        $uniqueKeyOne = 'name';
        $model = new Setting();

        foreach ($items as $item) {
            $model::updateOrCreate([
                $uniqueKeyOne => $item[$uniqueKeyOne],
            ], $item);
        }
    }
}
