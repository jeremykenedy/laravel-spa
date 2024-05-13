<?php

namespace Corals\Modules\Payment\Crypto;

use Corals\Modules\Payment\Crypto\Provider\CryptoEventServiceProvider;
use Corals\Modules\Payment\Crypto\Provider\CryptoRouteServiceProvider;
use Illuminate\Support\ServiceProvider;

class CryptoServiceProvider extends ServiceProvider
{
    private string $configDIR = __DIR__ . '/Config/config.php';

    private string $langDir = __DIR__ . '/resources/lang';


    public function boot(): void
    {
        $this->loadTranslationsFrom($this->langDir, 'Crypto');
    }

    public function register(): void
    {
        $this->mergeConfigFrom($this->configDIR,'Crypto');

        $this->loadServiceProviders();
    }

    public function loadServiceProviders(): void
    {
        $this->app->register(CryptoRouteServiceProvider::class);
        $this->app->register(CryptoEventServiceProvider::class);
    }
}
