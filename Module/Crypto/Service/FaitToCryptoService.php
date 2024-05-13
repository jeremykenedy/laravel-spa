<?php

namespace Corals\Modules\Payment\Crypto\Service;

use Module\Crypto\CryptoFinanceInterface;
use Module\Crypto\Foundation\Factory\FiatToCryptoFactory;

class FaitToCryptoService
{
    public CryptoFinanceInterface $gateway;

    public function __construct(FiatToCryptoFactory $connection)
    {
        $this->gateway = $connection->handle();
    }

}
