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
    'stackexchange' => [
        'enabled'       => env('STACKEXCHANGE_ENABLED', false),
        'client_id'     => env('STACKEXCHANGE_CLIENT_ID'),
        'client_secret' => env('STACKEXCHANGE_CLIENT_SECRET'),
        'redirect'      => env('STACKEXCHANGE_REDIRECT_URI'),
    ],
    'gitlab' => [
        'enabled'       => env('GITLAB_ENABLED', false),
        'client_id'     => env('GITLAB_CLIENT_ID'),
        'client_secret' => env('GITLAB_CLIENT_SECRET'),
        'redirect'      => env('GITLAB_REDIRECT_URI'),
    ],
    'reddit' => [
        'enabled'       => env('REDDIT_ENABLED', false),
        'client_id'     => env('REDDIT_CLIENT_ID'),
        'client_secret' => env('REDDIT_CLIENT_SECRET'),
        'redirect'      => env('REDDIT_REDIRECT_URI'),
    ],
    'snapchat' => [
        'enabled'       => env('SNAPCHAT_ENABLED', false),
        'client_id'     => env('SNAPCHAT_CLIENT_ID'),
        'client_secret' => env('SNAPCHAT_CLIENT_SECRET'),
        'redirect'      => env('SNAPCHAT_REDIRECT_URI'),
    ],
    'meetup' => [
        'enabled'       => env('MEETUP_ENABLED', false),
        'client_id'     => env('MEETUP_CLIENT_ID'),
        'client_secret' => env('MEETUP_CLIENT_SECRET'),
        'redirect'      => env('MEETUP_REDIRECT_URI'),
    ],
    'bitbucket' => [
        'enabled'       => env('BITBUCKET_ENABLED', false),
        'client_id'     => env('BITBUCKET_CLIENT_ID'),
        'client_secret' => env('BITBUCKET_CLIENT_SECRET'),
        'redirect'      => env('BITBUCKET_REDIRECT_URI'),
    ],
    'trello' => [
        'enabled'       => env('TRELLO_ENABLED', false),
        'client_id'     => env('TRELLO_CLIENT_ID'),
        'client_secret' => env('TRELLO_CLIENT_SECRET'),
        'redirect'      => env('TRELLO_REDIRECT_URI'),
    ],
    'zoom' => [
        'enabled'       => env('ZOOM_ENABLED', false),
        'client_id'     => env('ZOOM_CLIENT_ID'),
        'client_secret' => env('ZOOM_CLIENT_SECRET'),
        'redirect'      => env('ZOOM_REDIRECT_URI'),
    ],
    'mailchimp' => [
        'enabled'       => env('MAILCHIMP_ENABLED', false),
        'client_id'     => env('MAILCHIMP_CLIENT_ID'),
        'client_secret' => env('MAILCHIMP_CLIENT_SECRET'),
        'redirect'      => env('MAILCHIMP_REDIRECT_URI'),
    ],
    'disqus' => [
        'enabled'       => env('DISQUS_ENABLED', false),
        'client_id'     => env('DISQUS_CLIENT_ID'),
        'client_secret' => env('DISQUS_CLIENT_SECRET'),
        'redirect'      => env('DISQUS_REDIRECT_URI'),
    ],
    'atlassian' => [
        'enabled'       => env('ATLASSIAN_ENABLED', false),
        'client_id'     => env('ATLASSIAN_CLIENT_ID'),
        'client_secret' => env('ATLASSIAN_CLIENT_SECRET'),
        'redirect'      => env('ATLASSIAN_REDIRECT_URI'),
    ],
    'patreon' => [
        'enabled'       => env('PATREON_ENABLED', false),
        'client_id'     => env('PATREON_CLIENT_ID'),
        'client_secret' => env('PATREON_CLIENT_SECRET'),
        'redirect'      => env('PATREON_REDIRECT_URI'),
    ],
    'paypal' => [
        'enabled'       => env('PAYPAL_ENABLED', false),
        'client_id'     => env('PAYPAL_CLIENT_ID'),
        'client_secret' => env('PAYPAL_CLIENT_SECRET'),
        'redirect'      => env('PAYPAL_REDIRECT_URI'),
    ],
    'stripe' => [
        'enabled'       => env('STRIPE_ENABLED', false),
        'client_id'     => env('STRIPE_CLIENT_ID'),
        'client_secret' => env('STRIPE_CLIENT_SECRET'),
        'redirect'      => env('STRIPE_REDIRECT_URI'),
    ],
    'venmo' => [
        'enabled'       => env('VENMO_ENABLED', false),
        'client_id'     => env('VENMO_CLIENT_ID'),
        'client_secret' => env('VENMO_CLIENT_SECRET'),
        'redirect'      => env('VENMO_REDIRECT_URI'),
    ],
    'soundcloud' => [
        'enabled'       => env('SOUNDCLOUD_ENABLED', false),
        'client_id'     => env('SOUNDCLOUD_CLIENT_ID'),
        'client_secret' => env('SOUNDCLOUD_CLIENT_SECRET'),
        'redirect'      => env('SOUNDCLOUD_REDIRECT_URI'),
    ],
    'spotify' => [
        'enabled'       => env('SPOTIFY_ENABLED', false),
        'client_id'     => env('SPOTIFY_CLIENT_ID'),
        'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
        'redirect'      => env('SPOTIFY_REDIRECT_URI'),
    ],
    'arcgis' => [
        'enabled'       => env('ARCGIS_ENABLED', false),
        'client_id'     => env('ARCGIS_CLIENT_ID'),
        'client_secret' => env('ARCGIS_CLIENT_SECRET'),
        'redirect'      => env('ARCGIS_REDIRECT_URI'),
    ],
    'fitbit' => [
        'enabled'       => env('FITBIT_ENABLED', false),
        'client_id'     => env('FITBIT_CLIENT_ID'),
        'client_secret' => env('FITBIT_CLIENT_SECRET'),
        'redirect'      => env('FITBIT_REDIRECT_URI'),
    ],
    'uber' => [
        'enabled'       => env('UBER_ENABLED', false),
        'client_id'     => env('UBER_CLIENT_ID'),
        'client_secret' => env('UBER_CLIENT_SECRET'),
        'redirect'      => env('UBER_REDIRECT_URI'),
    ],
    'amazon' => [
        'enabled'       => env('AMAZON_ENABLED', false),
        'client_id'     => env('AMAZON_SIGNIN_CLIENT_ID'),
        'client_secret' => env('AMAZON_SIGNIN_SECRET'),
        'redirect'      => env('AMAZON_SIGNIN_REDIRECT_URI'),
    ],
];
