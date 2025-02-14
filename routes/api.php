<?php

use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\BrowserSessionController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('forget-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('forget.password.post');
Route::post('reset-password', [ResetPasswordController::class, 'reset'])->name('password.reset');

Route::group(['middleware' => ['auth:sanctum', 'forceHTTPS']], function() {

    // Route::group(['middleware' => ['role:admin']], function() {
        Route::apiResource('users', UserController::class);
    // });



    Route::apiResource('posts', PostController::class);
    Route::apiResource('categories', CategoryController::class);


    // Route::apiResource('roles', RoleController::class);
    // Route::get('role-list', [RoleController::class, 'getList']);
    // Route::get('role-permissions/{id}', [PermissionController::class, 'getRolePermissions']);
    // Route::put('/role-permissions', [PermissionController::class, 'updateRolePermissions']);
    // Route::apiResource('permissions', PermissionController::class);

    Route::get('/roles', [RoleController::class, 'roles']);
    Route::delete('/roles/delete/role/{role}', [RoleController::class, 'deleteRole']);
    Route::patch('/roles/update-role/{role}', [RoleController::class, 'updateRole']);
    Route::get('/roles-complete', [RoleController::class, 'rolesComplete']);
    Route::post('/roles/create-role', [RoleController::class, 'createRole']);

    Route::get('/permissions', [PermissionController::class, 'permissions']);
    Route::get('/permissions-paginated', [PermissionController::class, 'permissionsPaginated']);
    Route::delete('/permissions/delete/permission/{permission}', [PermissionController::class, 'deletePermission']);
    Route::patch('/permissions/update-permission/{permission}', [PermissionController::class, 'updatePermission']);
    Route::post('/permissions/create-permission', [PermissionController::class, 'createPermission']);

    Route::get('category-list', [CategoryController::class, 'getList']);
    Route::get('/user', [ProfileController::class, 'user']);
    Route::put('/user', [ProfileController::class, 'update']);
    Route::post('/toggle-dark-mode', [ProfileController::class, 'darkModeToggle']);

    // Browser Sessions
    Route::get('browser-sessions', [BrowserSessionController::class, 'index']);
    Route::post('logout-other-devices', [BrowserSessionController::class, 'logoutOtherDevices']);

    // Activity log
    Route::get('activity-logs', ActivityLogController::class);

    Route::get('abilities', function(Request $request) {
        return $request->user()->roles()->with('permissions')
            ->get()
            ->pluck('permissions')
            ->flatten()
            ->pluck('name')
            ->unique()
            ->values()
            ->toArray();
    });
});

Route::get('category-list', [CategoryController::class, 'getList']);
Route::get('get-posts', [PostController::class, 'getPosts']);
Route::get('get-category-posts/{id}', [PostController::class, 'getCategoryByPosts']);
Route::get('get-post/{id}', [PostController::class, 'getPost']);
