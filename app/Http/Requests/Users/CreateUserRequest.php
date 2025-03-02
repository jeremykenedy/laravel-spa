<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->hasPermission('create.users');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'              => 'required|min:3|max:255',
            'email'             => 'required|email|unique:users,email',
            'password'          => 'required|min:6|max:255|confirmed',
            'roles'             => 'present|array',
            'permissions'       => 'present|array',
            'theme_dark'        => 'nullable|boolean',
            'email_verified_at' => 'nullable|boolean',
        ];
    }
}
