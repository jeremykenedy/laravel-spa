<?php

namespace Corals\Modules\Payment\Crypto\Http\DTO;

use Corals\Modules\C2C\DTO\AbstractBaseDTO;
use Corals\Modules\Payment\Crypto\CoingateGateway;

class CryptoDTO extends AbstractBaseDTO
{
    public function __construct(
        public float $price_amount,
        public string $price_currency,
        public ?int $item_id = null,
    )
    {

    }
}
