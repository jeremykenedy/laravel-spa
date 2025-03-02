<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class LeaveImpersonateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}
