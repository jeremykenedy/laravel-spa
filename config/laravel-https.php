<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel Https Settings
    |--------------------------------------------------------------------------
    */
    'ForceHttpsCheckEnvironment'    => env('LARAVEL_FORCEHTTPSCHECKENVIRONMENT', true),
    'ForceHttpsEnvironmentToCheck'  => env('LARAVEL_FORCEHTTPSENVIRONMENTTOCHECK', 'production'),
    'httpsAccessDeniedErrorCode'    => env('LARAVEL_HTTP_ERROR_CODE', 403),

];
