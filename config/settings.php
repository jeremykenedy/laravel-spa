<?php

return [
    'author'                => env('APP_AUTHOR', 'Jeremy Edgar Kenedy'),
    'description'           => env('APP_DESC', 'A Laravel 9 + Socialite + Vite + Vue 3 + Tailwind CSS SPA Boilerplate with user authentication, registration, email verification, social media authentication, password recovery, user management, and roles/permissions managemenet. Uses TailwindCSS. While the front end is part of this repository it is a completely separated Vue 3 front end.'),
    'keywords'              => env('APP_KEYWORDS', 'framework,laravel,vite,vue3,spa,tailwindcss,auth,authentication,socialite,oauth2'),
    'enableKonamiAsteroids' => env('KONAMI_ASTEROIDS_ENABLED', false),
    'enableKonamiToasty'    => env('KONAMI_TOASTY_ENABLED', false),
    'vultrReferralEnabled'  => env('VULTR_REFERRAL_ENABLED', false),
    'vultrReferralLink'     => env('VULTR_REFERRAL_LINK', null),
];
