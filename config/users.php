<?php

return [

    'seeders' => [
        'superAdmin' => [
            'enabled'  => env('SEED_SUPER_ADMIN_USER_ENABLED', false),
            'name'     => env('SEED_SUPER_ADMIN_USER_NAME', 'Rick Sanchez'),
            'email'    => env('SEED_SUPER_ADMIN_USER_EMAIL', 'superadmin@superadmin.com'),
            'password' => env('SEED_SUPER_ADMIN_USER_PASSWORD', 'password'),
        ],
        'admin' => [
            'enabled'  => env('SEED_ADMIN_USER_ENABLED', false),
            'name'     => env('SEED_ADMIN_USER_NAME', 'Mr Nimbus'),
            'email'    => env('SEED_ADMIN_USER_EMAIL', 'admin@admin.com'),
            'password' => env('SEED_ADMIN_USER_PASSWORD', 'password'),
        ],
        'user' => [
            'enabled'  => env('SEED_USER_ENABLED', false),
            'name'     => env('SEED_USER_NAME', 'Scary Terr'),
            'email'    => env('SEED_USER_EMAIL', 'user@user.com'),
            'password' => env('SEED_USER_PASSWORD', 'password'),
        ],
    ],
];
