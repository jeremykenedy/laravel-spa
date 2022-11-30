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

    'google' => [
        'ga' => env('GOOGLE_ANALYTICS_ID', null),
    ],

    'twitch' => [
        'client_id'     => env('TWITCH_KEY'),
        'client_secret' => env('TWITCH_SECRET'),
        'redirect'      => url('api/oauth/twitch/callback'),
    ],

    'github' => [
        'client_id'     => env('GITHUB_KEY'),
        'client_secret' => env('GITHUB_SECRET'),
        'redirect'      => url('api/oauth/github/callback'),
    ],

    'tiktok' => [
        'client_id'     => env('TIKTOK_KEY'),
        'client_secret' => env('TIKTOK_SECRET'),
        'redirect'      => url('api/oauth/tiktok/callback'),
    ],

    'facebook' => [
        'client_id'     => env('FACEBOOK_KEY'),
        'client_secret' => env('FACEBOOK_SECRET'),
        'redirect'      => url('api/oauth/facebook/callback'),
    ],

    'google' => [
        'client_id'     => env('GOOGLE_KEY'),
        'client_secret' => env('GOOGLE_SECRET'),
        'redirect'      => url('api/oauth/google/callback'),
    ],

    'youtube' => [
        'client_id'     => env('YOUTUBE_KEY'),
        'client_secret' => env('YOUTUBE_SECRET'),
        'redirect'      => url('api/oauth/youtube/callback'),
    ],

    'instagram' => [
        'client_id'     => env('INSTAGRAM_KEY'),
        'client_secret' => env('INSTAGRAM_SECRET'),
        'redirect'      => url('api/oauth/instagram/callback'),
    ],

    'microsoft' => [
        'client_id'     => env('MICROSOFT_CLIENT_ID'),
        'client_secret' => env('MICROSOFT_CLIENT_SECRET'),
        'redirect'      => url('api/oauth/microsoft/callback'),
    ],

    'apple' => [
        'client_id'     => env('APPLE_CLIENT_ID'),
        'client_secret' => env('APPLE_CLIENT_SECRET'),
        'redirect'      => url('api/oauth/apple/callback'),
    ],

    'twitter' => [
        'client_id'     => env('TWITTER_CLIENT_ID'),
        'client_secret' => env('TWITTER_CLIENT_SECRET'),
        'redirect'      => url('api/oauth/twitter/callback'),
    ],

    'linkedin' => [
        'client_id'     => env('LINKEDIN_CLIENT_ID'),
        'client_secret' => env('LINKEDIN_CLIENT_SECRET'),
        'redirect'      => url('api/oauth/linkedin/callback'),
    ],
];
