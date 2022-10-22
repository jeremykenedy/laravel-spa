<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\GetUserRolesRequest;
use App\Http\Resources\Users\RolesCollection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RolesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('role:super.admin');

        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    public function roles(GetUserRolesRequest $request)
    {
        return new RolesCollection(config('roles.models.role')::all());
    }

    public function rolesComplete(GetUserRolesRequest $request)
    {
        $roles = config('roles.models.role')::with([
            'users:name,id,email',
            'permissions:id,name',
        ])->get();

        return response()->json([
            'roles'  => $roles,
        ]);
    }
}
