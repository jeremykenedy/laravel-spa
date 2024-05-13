<?php

use Illuminate\Routing\Route;

Route::controller('CryptoController')
    ->prefix('crypto')
    ->group(
        function () {
            Route::post('send', 'send');
            Route::post('callback', 'callback');
            Route::post('verify', 'verify');
        }
    );
