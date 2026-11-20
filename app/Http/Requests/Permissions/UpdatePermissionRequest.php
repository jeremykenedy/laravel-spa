<?php

declare(strict_types=1);

namespace App\Http\Requests\Permissions;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->hasPermission('edit.permissions')
            && ($this->user()->hasRole('superadmin') || $this->canManage($this->route('permission')));
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
            // 'slug'              => 'required|string|unique:permissions,slug',
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

    /**
     * Whether the caller holds the permission and no role above the caller's
     * level relies on it.
     */
    private function canManage(Permission $permission): bool
    {
        return $this->user()->getPermissions()->contains('id', $permission->id)
            && ! $permission->roles()->where('level', '>', $this->user()->level())->exists();
    }
}
