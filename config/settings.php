<?php

return [
    'author'                => env('APP_AUTHOR', 'Jeremy Edgar Kenedy'),
    'description'           => env('APP_DESC', 'A Personal Budget Application'),
    'keywords'              => env('APP_KEYWORDS', 'framework,laravel,vite,vue3,spa,tailwindcss,auth,authentication,socialite,oauth2'),
    'enableKonamiAsteroids' => env('KONAMI_ASTEROIDS_ENABLED', false),
    'enableKonamiToasty'    => env('KONAMI_TOASTY_ENABLED', false),
    'vultrReferralEnabled'  => env('VULTR_REFERRAL_ENABLED', false),
    'vultrReferralLink'     => env('VULTR_REFERRAL_LINK', null),
    'githubButtons'         => [
        'enable'    => env('GH_BUTTONS_ENABLED', false),
        'base_url'  => env('GH_BUTTONS_BASE_URL', 'https://github.com/'),
        'username'  => env('GH_BUTTONS_USERNAME', 'jeremykenedy'),
        'repo'      => env('GH_BUTTONS_REPO', 'laravel-spa'),
    ],
    'buyMeACoffee'  => [
        'enabled'   => env('BMC_ENABLED', false),
        'base_url'  => env('BMC_BASE_URL', 'https://www.buymeacoffee.com/'),
        'username'  => env('BMC_USER', 'jeremykenedy'),
        'text'      => env('BMC_TEXT', 'Buy me a coffee'),
    ],
    'octocat'       => [
        'enable'    => env('OCTOCAT_ENABLED', false),
        'base_url'  => env('OCTOCAT_BASE_URL', 'https://github.com/'),
        'username'  => env('OCTOCAT_USERNAME', 'jeremykenedy'),
        'repo'      => env('OCTOCAT_REPO', 'laravel-spa'),
    ],
];
