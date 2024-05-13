<?php

namespace Corals\Modules\Payment\Crypto\Http\Controllers\API;

use Corals\Foundation\Http\Controllers\APIPublicController;
use Corals\Modules\C2C\DTO\CompletePaymentDTO;
use Corals\Modules\Payment\Crypto\Exception\CryptoException;
use Corals\Modules\Payment\Crypto\Http\DTO\CryptoDTO;
use Corals\Modules\Payment\Crypto\Http\Request\CallbackRequest;
use Corals\Modules\Payment\Crypto\Http\Request\CryptoRequest;
use Corals\Modules\Payment\Crypto\Service\FaitToCryptoService;
use Illuminate\Http\JsonResponse;
use Redirect;

class CryptoController extends APIPublicController
{
    public function __construct(protected FaitToCryptoService $cryptoService)
    {
        parent::__construct();
    }

    public function send(CryptoRequest $request): JsonResponse
    {
        try {

            $cryptoDTO = new CryptoDTO(
                price_amount: $request->input('price_amount'),
                price_currency: $request->input('price_currency'),
                item_id: $request->input('item_id')
            );

            $response = $this->cryptoService->process($cryptoDTO);
            return apiResponse($response);

        } catch (\Exception $exception) {
            apiLogReport($exception);
            return apiExceptionResponse($exception);
        }
    }

    public function callback(CallbackRequest $response)
    {
        try {
            $response = $this->cryptoService->callback($response);
            return Redirect::away($response);

        } catch (\Exception $exception) {

            apiLogReport($exception);
            return apiExceptionResponseNotReportable($exception);
        }
    }

    public function verify(CallbackRequest $request)
    {
        try {

            $payload = [
              'order_id' =>  $request->id,
              'payer_id' => user()->id,
            ];

            $response = $this->cryptoService->verifyPayment($payload);
            return apiResponse($response);

        } catch (\Exception $exception) {

            apiLogReport($exception);
            return apiExceptionResponseNotReportable($exception);
        }
    }
}
