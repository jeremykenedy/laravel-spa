<?php

namespace Factory;

namespace Module\Crypto\Foundation\Factory;

class CryptoExchangerFactory
{
    public function handle()
    {
        if ($this->getActiveCryptoGateway() == 'Binance'){
            return app(BinanceExchangerFacade::class);
        }

        throw new \Exception('There is no gateway !');
    }

    public function getActiveCryptoGateway()
    {
        return config('Crypto.ACTIVE_GATEWAY');
    }
}
