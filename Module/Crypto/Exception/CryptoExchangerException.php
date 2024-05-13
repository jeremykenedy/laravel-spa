<?php

namespace Module\Crypto\Exception;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class CryptoExchangerException extends Exception {

    public function setMessage(mixed $message): void
    {
        $show = null;
        if ($message == null){
            $show = $this->getMessage();
        }

        $this->message = $show;
    }

    public function __construct($message = null, \Throwable|null $previous = null)
    {
        parent::__construct($message.$this->message, 500,$previous);
    }

    public function report(): void
    {
        Log::error('CryptoException: ' . $this->message, ['exception' => $this]);
    }

    public function render(): JsonResponse
    {
        return response()->json([
            'error' => [
                'message' => "There is an issue",
            ]
        ], 500);
    }
}
