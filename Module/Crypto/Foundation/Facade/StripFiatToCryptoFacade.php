<?php

namespace Module\Crypto\Foundation\Facade;

use Corals\Modules\Payment\Crypto\StripFaitToPayment;
use Illuminate\Support\Facades\Facade;

class StripFiatToCryptoFacade extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return StripFaitToPayment::class;
    }
}
