<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->hasPermission('edit.users');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'              => 'required|string|min:3|max:255',
            // 'email'             => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'password'          => 'nullable|string|min:6|max:255|confirmed',
            'roles'             => 'present|array',
            'permissions'       => 'present|array',
            'theme_dark'        => 'nullable|boolean',
            'email_verified_at' => 'nullable',
        ];
    }
}
