<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePermissionRequest;
use App\Http\Resources\PermissionResource;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $orderColumn = request('order_column', 'created_at');
        if (!in_array($orderColumn, ['id', 'name', 'created_at'])) {
            $orderColumn = 'created_at';
        }
        $orderDirection = request('order_direction', 'desc');
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }
        $permissions = Permission::
        when(request('search_id'), function ($query) {
            $query->where('id', request('search_id'));
        })
            ->when(request('search_title'), function ($query) {
                $query->where('name', 'like', '%' . request('search_title') . '%');
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function ($q) {
                    $q->where('id', request('search_global'))
                        ->orWhere('name', 'like', '%' . request('search_global') . '%');

                });
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(50);

        return PermissionResource::collection($permissions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StorePermissionRequest $request
     * @return PermissionResource
     * @throws AuthorizationException
     */
    public function store(StorePermissionRequest $request)
    {
        $this->authorize('permission-create');

        $permission = new Permission();
        $permission->name = $request->name;
        $permission->guard_name = 'web';

        if ($permission->save()) {
            return new PermissionResource($permission);
        }

        return response()->json(['status' => 405, 'success' => false]);

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return PermissionResource
     */
    public function show(Permission $permission)
    {
        $this->authorize('permission-edit');

        return new PermissionResource($permission);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Permission $permission
     * @param StorePermissionRequest $request
     * @return JsonResponse|PermissionResource
     * @throws AuthorizationException
     */
    public function update(Permission $permission, StorePermissionRequest $request)
    {
        $this->authorize('permission-edit');

        $permission->name = $request->name;

        if ($permission->save()) {
            return new PermissionResource($permission);
        }

        return response()->json(['status' => 405, 'success' => false]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        $this->authorize('permission-delete');
        $permission->delete();

        return response()->noContent();
    }

    public function getRolePermissions($id)
    {
        $permissions = Role::findById($id, 'web')->permissions;
        return PermissionResource::collection($permissions);
    }

    public function updateRolePermissions(Request $request)
    {
        $this->authorize('role-edit');

        $permissions = json_decode($request->permissions, true);
        $permissions_where = Permission::whereIn('id', $permissions)->get();
        $role = Role::findById($request->role_id, 'web');
        $role->syncPermissions($permissions_where);
        return PermissionResource::collection($permissions_where);
    }
}
