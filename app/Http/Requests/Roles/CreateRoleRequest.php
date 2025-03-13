<?php

namespace App\Http\Requests\Roles;

use Illuminate\Foundation\Http\FormRequest;

class CreateRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->hasPermission('create.roles');
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
            'slug'              => 'required|string|unique:roles,slug',
            'description'       => 'nullable|string|max:255',
            'level'             => 'nullable|integer',
            'permissions'       => 'present|array',
        ];
    }
}
