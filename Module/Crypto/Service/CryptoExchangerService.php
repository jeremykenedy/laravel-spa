<?php

namespace Module\Crypto\Service;

use Module\Crypto\CryptoExchangerInterface;
use Module\Crypto\Foundation\Factory\CryptoExchangerFactory;

class CryptoExchangerService
{
    public CryptoExchangerInterface $gateway;

    public function __construct(CryptoExchangerFactory $connection)
    {
        $this->gateway = $connection->handle();
    }

}
