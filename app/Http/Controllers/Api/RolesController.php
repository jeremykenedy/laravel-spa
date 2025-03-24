<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Roles\CreateRoleRequest;
use App\Http\Requests\Roles\GetUserRolesRequest;
use App\Http\Requests\Roles\UpdateRoleRequest;
use App\Http\Resources\Roles\RolesCollection;
use App\Models\Role;
use Illuminate\Http\Request;

class RolesController extends Controller
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

    public function roles(GetUserRolesRequest $request)
    {
        return new RolesCollection(Role::all());
    }

    public function rolesComplete(GetUserRolesRequest $request)
    {
        $per = 10;

        if ($request->has('per')) {
            $per = $request->input('per');
        }

        return response()->json(Role::with([
            'users:name,id,email',
            'permissions:id,name',
        ])->paginate($per));
    }

    public function createRole(CreateRoleRequest $request)
    {
        $validated = $request->validated();

        $role = Role::create([
            'name'          => $validated['name'],
            'slug'          => $validated['slug'],
            'description'   => $validated['description'],
            'level'         => $validated['level'],
        ]);

        if ($role) {
            $role->syncPermissions($validated['permissions']);

            return response()->json([
                'role'  => $role,
            ]);
        }
    }

    public function updateRole(UpdateRoleRequest $request, Role $role)
    {
        $request->validate([
            'slug' => 'required|string|unique:roles,slug,'.$role->id,
        ]);

        $validated = $request->validated();
        $role->update($request->only('name', 'slug', 'description', 'level'));
        $role->syncPermissions($validated['permissions']);

        return response()->json([
            'role'  => $role,
        ]);
    }

    public function deleteRole(Request $request, Role $role)
    {
        $role->delete();

        return response()->json($role);
    }
}
