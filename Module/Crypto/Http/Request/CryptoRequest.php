<?php

namespace Corals\Modules\Payment\Crypto\Http\Request;

use Corals\Foundation\Http\Requests\BaseRequest;
use Corals\Modules\C2C\Repositories\ProductRepository;
use Illuminate\Validation\Rule;

class CryptoRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'price_amount' => ['required', 'numeric'],
            'price_currency' => ['required', 'string', Rule::in(['USD','HKD'])],
            'item_id' => ['nullable', Rule::in(ProductRepository::getIds())],
        ];
    }
}
