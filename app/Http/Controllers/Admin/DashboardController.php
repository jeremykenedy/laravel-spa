<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminDashboardRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');

        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    public function dashboardData(AdminDashboardRequest $request)
    {
        $data = $this->superAdminDashboardData();
        $data = array_merge($data, $this->adminDashboardData());

        return response()->json($data);
    }

    protected function superAdminDashboardData()
    {
        $data = [];
        $user = Auth::user();

        if ($user->hasRole(['superadmin'], true)) {
            $data['users'] = User::all()->count();
            $data['roles'] = Role::all()->count();
            $data['permissions'] = Permission::all()->count();
        }

        return $data;
    }

    protected function adminDashboardData()
    {
        $data = [];
        $user = Auth::user();

        if ($user->hasRole(['admin'], true)) {
            // Add to data here
        }

        return $data;
    }
}
