<?php

namespace Module\Crypto;

interface CryptoFinanceInterface
{
    public function getFiatHistory(array $payload = []);

    public function createFaitOrder(array $payload = []);

    public function getCallbackFiatOrder(array $payload = []);
}
