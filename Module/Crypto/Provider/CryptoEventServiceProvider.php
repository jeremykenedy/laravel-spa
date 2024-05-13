<?php

namespace Module\Crypto\Provider;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class CryptoEventServiceProvider extends ServiceProvider
{
    protected array $listen = [
//        CryptoCallbackEvent::class => [
//            CryptoCallbackListener::class,
//        ],
    ];
}
