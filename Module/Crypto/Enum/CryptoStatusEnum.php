<?php

namespace Corals\Modules\Payment\Crypto\Enum;

use Corals\Modules\Sales\Concerns\EnumToArray;

enum CryptoStatusEnum: string
{
    use EnumToArray;

    case PENDING = 'pending';

    case PAID = 'paid';

    case INVALID = 'invalid';

    case EXPIRED = 'expired';

    case CANCELED = 'canceled';

    case CONFIRMING = 'confirming';

    public static function isStatusValidForCallback(string $status): bool
    {
        return in_array($status,[self::PAID->value,self::CONFIRMING->value]);
    }

}
