<?php

declare(strict_types=1);

namespace App\Http\Requests\Users;

use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->hasPermission('edit.users')
            && $this->user()->level() >= $this->route('user')->level();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:255',
            // 'email'             => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:6|max:255|confirmed',
            'roles' => 'present|array',
            'roles.*' => [
                Rule::exists(Role::class, 'id')
                    ->withoutTrashed()
                    ->where(fn ($query) => $query->where('level', '<=', $this->user()->level())),
            ],
            'permissions' => 'present|array',
            'theme_dark' => 'nullable|boolean',
            'email_verified_at' => 'nullable',
        ];
    }
}
