<?php

declare(strict_types=1);

namespace App\Http\Requests\Permissions;

use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreatePermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->hasPermission('create.permissions');
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
            'slug' => 'required|string|unique:permissions,slug',
            'description' => 'nullable|string|max:255',
            'model' => 'string|nullable',
            'roles' => 'present|array',
            'roles.*' => [
                Rule::exists(Role::class, 'id')
                    ->withoutTrashed()
                    ->where(fn ($query) => $query->where('level', '<=', $this->user()->level())),
            ],
        ];
    }
}
