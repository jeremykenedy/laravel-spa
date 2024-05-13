<?php

namespace Corals\Modules\Payment\Crypto\Http\DTO;

use Corals\Modules\C2C\DTO\AbstractBaseDTO;
use Corals\Modules\Payment\Crypto\CoingateGateway;
use Corals\User\Models\User;

class CryptoTransactionDTO extends AbstractBaseDTO
{
    public function __construct(
        public int $paymentId,
        public int $payerId
    ) {
    }
}
