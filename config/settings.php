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

    /*
     * Is email activation required
     */
    'app_project_version' => env('APP_PROJECT_VERSION', 10),

    /*
     * Is email activation required
     */
    'activation' => env('ACTIVATION', false),

    /*
     * Is email activation required
     */
    'timePeriod' => env('ACTIVATION_LIMIT_TIME_PERIOD', 24),

    /*
     * Is email activation required
     */
    'maxAttempts' => env('ACTIVATION_LIMIT_MAX_ATTEMPTS', 3),

    /*
     * NULL Ip to enter to match database schema
     */
    'nullIpAddress' => env('NULL_IP_ADDRESS', '0.0.0.0'),

    /*
     * User restore encryption type
     */
    'restoreUserEncType' => 'AES-256-ECB',

    /*
     * User restore days past cutoff
     */
    'restoreUserCutoff' => env('USER_RESTORE_CUTOFF_DAYS', 31),

    /*
     * User list pagination size
     */
    'userListPaginationSize' => env('USER_LIST_PAGINATION_SIZE', 50),

    /*
     * User restore encryption key
     */
    'restoreKey' => env('USER_RESTORE_ENCRYPTION_KEY', 'sup3rDuP3rS3cr3tR35t0r3K3y21!'),

    /*
     * ReCaptcha Status
     */
    'reCaptchStatus' => env('ENABLE_RECAPTCHA', false),

    /*
     * ReCaptcha Site Key
     */
    'reCaptchSite'   => env('RE_CAP_SITE', 'YOURGOOGLECAPTCHAsitekeyHERE'),

    /*
     * ReCaptcha Secret
     */
    'reCaptchSecret' => env('RE_CAP_SECRET', 'YOURGOOGLECAPTCHAsecretHERE'),

    /*
     * Google Maps API V3 Status
     */
    'googleMapsAPIStatus' => env('GOOGLEMAPS_API_STATUS', false),

    /*
     * Google Maps API Key
     */
    'googleMapsAPIKey'    => env('GOOGLEMAPS_API_KEY', 'YOURGOOGLEMAPSkeyHERE'),

    /*
     * DropZone CDN
     */
    'dropZoneJsCDN'    => env('DROPZONE_JS_CDN', 'https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.4.0/dropzone.js'),

    /*
     * Google Analytics
     */
    'googleanalyticsId' => env('GOOGLE_ANALYTICS_ID', false),

    /*
     * enable/disable HTTP Method column in admin's route details list
     */
    'showRouteHttpMethod' => env('SHOW_ROUTE_HTTP_METHOD', 1),

    /*
     * Tiny MCE Editor Key
     */
    'tinymce' => [
        'key' => env('TINY_MCE_KEY', null),
    ],

    /*
     * CK Editor Key
     */
    'ckeditor' => [
        'key' => env('CK_EDITOR_KEY', null),
    ],

    /*
     * OpenAI Key
     */
    'open_ai' => [
        'key' => env('OPEN_AI_KEY', null),
    ],

];
