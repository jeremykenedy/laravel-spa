<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class ViewUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->hasPermission('view.users');
    }
}

