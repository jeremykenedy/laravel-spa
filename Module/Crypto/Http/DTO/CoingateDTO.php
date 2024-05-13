<?php

namespace Corals\Modules\Payment\Crypto\Http\DTO;

use Corals\Modules\C2C\DTO\AbstractBaseDTO;
use Corals\Modules\Payment\Crypto\CoingateGateway;

class CoingateDTO extends AbstractBaseDTO
{

    public function __construct(
        public string  $price_amount,
        public string  $price_currency,
        public ?string $receive_currency = null,
        public ?string $order_id = null,
        public ?int    $item_id = null,
        public ?string $title = null,
        public ?string $description = null,
        public ?string $callback_url = null,
        public ?string $cancel_url = null,
        public ?string $success_url = null,
        public ?string $token = null,
        public ?string $purchaser_email = null,
        public ?string $shopper = null,
    )
    {
        $this->price_amount = $this->getPriceAmount();
        $this->order_id = $this->getOrderId();
        $this->title = $this->getTitle();
        $this->callback_url = $this->getCallbackURL();
        $this->cancel_url = $this->getCancelURL();
        $this->success_url = $this->getSuccessURL();
        $this->receive_currency = $this->getReceiverCurrency();
        $this->purchaser_email = user()?->email;
    }

    public function getPriceAmount()
    {
        return getPriceSupportedCurrencies($this->price_amount,$this->price_currency)['USD']['price'];
    }

    public function getOrderId(): string
    {
        $timestamp = now()->timestamp;

        $userId = optional(auth()->user())->id ?? 'undefined';

        return 'CRYPTO-' . $userId . '-' . $this->item_id . '-' . $timestamp;
    }

    public function getTitle(): string
    {
        if (!empty($this->itemName)) {
            return 'Create Crypto Order For Item : ' . $this->itemName;
        }

        return 'Create Crypto Order For Item';
    }

    public function getReceiverCurrency(): string
    {
        return app(CoingateGateway::class)->getReceiveCurrency();
    }

    public function getSuccessURL(): string
    {
        return app(CoingateGateway::class)->getSuccessURL();
    }

    public function getCancelURL(): string
    {
        return app(CoingateGateway::class)->getCancelURL();
    }

    public function getCallbackURL(): string
    {
        return app(CoingateGateway::class)->getCallbackURL();
    }
}
