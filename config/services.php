<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain'   => env('MAILGUN_DOMAIN'),
        'secret'   => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],
    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],
    'ses' => [
        'key'    => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    'twitch' => [
        'enabled'       => env('TWITCH_ENABLED', false),
        'client_id'     => env('TWITCH_KEY'),
        'client_secret' => env('TWITCH_SECRET'),
        'redirect'      => env('TWITCH_REDIRECT_URI'),
    ],
    'github' => [
        'enabled'       => env('GITHUB_ENABLED', false),
        'client_id'     => env('GITHUB_KEY'),
        'client_secret' => env('GITHUB_SECRET'),
        'redirect'      => env('GITHUB_REDIRECT_URI'),
    ],
    'tiktok' => [
        'enabled'       => env('TIKTOK_ENABLED', false),
        'client_id'     => env('TIKTOK_KEY'),
        'client_secret' => env('TIKTOK_SECRET'),
        'redirect'      => env('TIKTOK_REDIRECT_URI'),
    ],
    'facebook' => [
        'enabled'       => env('FACEBOOK_ENABLED', false),
        'client_id'     => env('FACEBOOK_KEY'),
        'client_secret' => env('FACEBOOK_SECRET'),
        'redirect'      => env('FACEBOOK_REDIRECT_URI'),
    ],
    'google' => [
        'ga'            => env('GOOGLE_ANALYTICS_ID', null),
        'enabled'       => env('GOOGLE_ENABLED', false),
        'client_id'     => env('GOOGLE_KEY'),
        'client_secret' => env('GOOGLE_SECRET'),
        'redirect'      => env('GOOGLEREDIRECT_URI'),
    ],
    'youtube' => [
        'enabled'       => env('YOUTUBE_ENABLED', false),
        'client_id'     => env('YOUTUBE_KEY'),
        'client_secret' => env('YOUTUBE_SECRET'),
        'redirect'      => env('YOUTUBE_REDIRECT_URI'),
    ],
    'instagram' => [
        'enabled'       => env('INSTAGRAM_ENABLED', false),
        'client_id'     => env('INSTAGRAM_KEY'),
        'client_secret' => env('INSTAGRAM_SECRET'),
        'redirect'      => env('INSTAGRAM_REDIRECT_URI'),
    ],
    'microsoft' => [
        'enabled'       => env('MICROSOFT_ENABLED', false),
        'client_id'     => env('MICROSOFT_CLIENT_ID'),
        'client_secret' => env('MICROSOFT_CLIENT_SECRET'),
        'redirect'      => env('MICROSOFT_REDIRECT_URI'),
    ],
    'apple' => [
        'enabled'       => env('APPLE_ENABLED', false),
        'client_id'     => env('APPLE_CLIENT_ID'),
        'client_secret' => env('APPLE_CLIENT_SECRET'),
        'redirect'      => env('APPLE_REDIRECT_URI'),
    ],
    'twitter' => [
        'enabled'       => env('TWITTER_ENABLED', false),
        'client_id'     => env('TWITTER_CLIENT_ID'),
        'client_secret' => env('TWITTER_CLIENT_SECRET'),
        'redirect'      => env('TWITTER_REDIRECT_URI'),
    ],
    'linkedin' => [
        'enabled'       => env('LINKEDIN_ENABLED', false),
        'client_id'     => env('LINKEDIN_CLIENT_ID'),
        'client_secret' => env('LINKEDIN_CLIENT_SECRET'),
        'redirect'      => env('LINKEDIN_REDIRECT_URI'),
    ],
];
