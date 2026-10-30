<?php

declare(strict_types=1);

namespace App\Http\Requests\Permissions;

use Illuminate\Foundation\Http\FormRequest;

class DeletePermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->hasPermission('delete.permissions');
    }
}
