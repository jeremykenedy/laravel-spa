<?php

namespace Module\Crypto\Foundation\Facade;

use Corals\Modules\Payment\Crypto\BinanceExchanger;
use Illuminate\Support\Facades\Facade;

class BinanceExchangerFacade extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return BinanceExchanger::class;
    }
}
