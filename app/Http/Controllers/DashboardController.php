<?php

namespace App\Http\Controllers;

use App\Http\Resources\Users\RolesCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DashboardController extends Controller
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

    public function dashboardData(Request $request)
    {
        $roles = new RolesCollection(config('roles.models.role')::all());
        $users = User::all('id', 'name', 'email');
        return response()->json([
            'users'  => $users,
            'roles' => $roles,
        ]);
    }
}
