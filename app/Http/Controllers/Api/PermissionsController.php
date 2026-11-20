<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Permissions\CreatePermissionRequest;
use App\Http\Requests\Permissions\DeletePermissionRequest;
use App\Http\Requests\Permissions\GetPermissionsRequest;
use App\Http\Requests\Permissions\UpdatePermissionRequest;
use App\Http\Resources\Permissions\PermissionsCollection;
use App\Models\Permission;
use App\Models\Role;

class PermissionsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        // $this->middleware('role:superadmin');

        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    public function permissions(GetPermissionsRequest $request)
    {
        return new PermissionsCollection(config('roles.models.permission')::all());
    }

    public function permissionsPaginated(GetPermissionsRequest $request)
    {
        $per = 10;

        if ($request->has('per')) {
            $per = $request->input('per');
        }

        return response()->json(Permission::with([
            'users:name,id,email',
            'roles:id,name',
        ])->paginate($per));
    }

    public function createPermission(CreatePermissionRequest $request)
    {
        $validated = $request->validated();

        $permission = Permission::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'description' => $validated['description'],
            'model' => $validated['model'],
        ]);

        if ($permission) {
            $permission->roles()->sync($validated['roles']);
        }

        $permission->load([
            'users:name,id,email',
            'roles:id,name',
        ]);

        return response()->json([
            'permission' => $permission,
        ]);
    }

    public function updatePermission(UpdatePermissionRequest $request, Permission $permission)
    {
        $request->validate([
            'slug' => 'required|string|unique:permissions,slug,'.$permission->id,
        ]);

        $validated = $request->validated();
        $permission->update($request->only('name', 'slug', 'description', 'model'));
        $permission->roles()->sync($validated['roles']);

        $permission->load([
            'users:name,id,email',
            'roles:id,name',
        ]);

        return response()->json([
            'permission' => $permission,
        ]);
    }

    public function deletePermission(DeletePermissionRequest $request, Permission $permission)
    {
        $permission->delete();

        return response()->json($permission);
    }
}
