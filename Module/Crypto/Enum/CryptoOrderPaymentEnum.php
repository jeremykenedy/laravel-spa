<?php

namespace Corals\Modules\Payment\Crypto\Enum;

use Corals\Modules\Sales\Concerns\EnumToArray;

enum CryptoOrderPaymentEnum: string
{
    use EnumToArray;

    case FULL = 'pending';

    case REMAIN = 'paid';

    case REFUND = 'invalid';
}
