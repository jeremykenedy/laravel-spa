<?php

declare(strict_types=1);

namespace App\Http\Requests\Roles;

use App\Models\Permission;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;

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
            'name' => 'required|string|min:3|max:255',
            'slug' => 'required|string|unique:roles,slug',
            'description' => 'nullable|string|max:255',
            'level' => 'nullable|integer|max:'.$this->user()->level(),
            'permissions' => 'present|array',
            'permissions.*' => [Rule::in($this->grantablePermissionIds()->all())],
        ];
    }

    /**
     * Permissions the caller may put on a role: every permission for a
     * Super Admin, otherwise only the ones the caller holds.
     *
     * @return Collection<int, int>
     */
    private function grantablePermissionIds(): Collection
    {
        if ($this->user()->hasRole('superadmin')) {
            return Permission::pluck('id');
        }

        return $this->user()->getPermissions()->pluck('id');
    }
}
