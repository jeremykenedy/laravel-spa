<?php

namespace Corals\Modules\Payment\Crypto\Http\Request;

use Corals\Foundation\Http\Requests\BaseRequest;
use Illuminate\Validation\Rule;

class CallbackRequest extends BaseRequest
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

        ];
    }
}
