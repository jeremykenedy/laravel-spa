<?php

namespace Corals\Modules\Payment\Crypto;

use Module\Crypto\CryptoFinanceInterface;

class StripFaitToPayment implements CryptoFinanceInterface
{

    public function getFiatHistory(array $payload = [])
    {
        // TODO: Implement getFiatHistory() method.
    }

    public function createFaitOrder(array $payload = [])
    {
        // TODO: Implement createFaitOrder() method.
    }

    public function getCallbackFiatOrder(array $payload = [])
    {
        // TODO: Implement getCallbackFiatOrder() method.
    }
}
