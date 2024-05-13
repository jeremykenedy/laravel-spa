<?php

namespace Module\Crypto\Foundation\Factory;

use Module\Crypto\Foundation\Facade\StripFiatToCryptoFacade;

class FiatToCryptoFactory
{
    public function handle()
    {
        if ($this->getActiveCryptoGateway() == 'Strip'){
            return app(StripFiatToCryptoFacade::class);
        }

        throw new \Exception('There is no gateway !');
    }

    public function getActiveCryptoGateway()
    {
        return config('Crypto.ACTIVE_GATEWAY');
    }
}
