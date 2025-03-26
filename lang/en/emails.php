<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Email Language Lines
    |--------------------------------------------------------------------------
    |
    */
    'activation' => [
        'subject'       => 'Activation required',
        'greeting'      => 'Welcome :username,',
        'message'       => 'You need to activate your email before you can start using all of our services.',
        'action'        => 'Activate',
        'goodbye'       => 'Thank you for using our application!',
    ],
    'password' => [
        'request' => [
            'subject'       => 'Reset Password Notification',
            'message'       => 'You are receiving this email because we received a password reset request for your account.',
            'action'        => 'Reset Password',
            'goodbye'       => 'If you did not request a password reset, no further action is required.',
        ],
        'changed' => [
            'subject'   => 'Password Reset Notification',
            'greeting'  => 'Hello :username,',
            'message'   => 'You are receiving this email because your password for your account was reset.',
            'action'    => 'Go to Login',
            'goodbye'   => 'If you did not just change your password then you should immediately change it now.',
        ],
    ],
    'goodbye' => [
        'subject'       => 'Sorry to see you go...',
        'greeting'      => 'Hello :username,',
        'message'       => 'We are very sorry to see you go. We wanted to let you know that your account has been deleted. Thank for the time we shared. You have '.config('settings.restoreUserCutoff').' days to restore your account.',
        'action'        => 'Restore Account',
        'goodbye'       => 'We hope to see you again!',
    ],
    'personal-data-exports' => [
        'notifications' => [
            'greeting'          => 'Hello :username,',
            'subject'           => 'Your data is ready to download',
            'instructions'      => 'You can click on the link to download your user data.',
            'action'            => 'Download Data',
            'deletion_message'  => 'Your data wil be available to download until :date.',
        ],
    ],
];
