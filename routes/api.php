<?php

use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\BrowserSessionController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PermissionsController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('forget-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('forget.password.post');
Route::post('reset-password', [ResetPasswordController::class, 'reset'])->name('password.reset');

Route::group(['middleware' => ['auth:sanctum', 'forceHTTPS']], function() {

    Route::apiResource('posts', PostController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::get('category-list', [CategoryController::class, 'getList']);
    Route::get('/user', [ProfileController::class, 'user']);
    Route::put('/user', [ProfileController::class, 'update']);
    Route::post('/toggle-dark-mode', [ProfileController::class, 'darkModeToggle']);
    Route::get('browser-sessions', [BrowserSessionController::class, 'index']);
    Route::post('logout-other-devices', [BrowserSessionController::class, 'logoutOtherDevices']);
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

    Route::group(['middleware' => ['role:superadmin']], function() {

        // Route::apiResource('users', UsersController::class);

        Route::get('/users', [UsersController::class, 'users']);
        Route::post('/users/toggle-verify', [UsersController::class, 'toggleVerify']);
        Route::delete('/users/delete/user/{user}', [UsersController::class, 'deleteUser']);
        Route::post('/users/create-user', [UsersController::class, 'createUser']);
        Route::patch('/users/update-user/{user}', [UsersController::class, 'updateUser']);


        Route::get('/roles', [RolesController::class, 'roles']);
        Route::delete('/roles/delete/role/{role}', [RolesController::class, 'deleteRole']);
        Route::patch('/roles/update-role/{role}', [RolesController::class, 'updateRole']);
        Route::get('/roles-complete', [RolesController::class, 'rolesComplete']);
        Route::post('/roles/create-role', [RolesController::class, 'createRole']);
        Route::get('/permissions', [PermissionsController::class, 'permissions']);
        Route::get('/permissions-paginated', [PermissionsController::class, 'permissionsPaginated']);
        Route::delete('/permissions/delete/permission/{permission}', [PermissionsController::class, 'deletePermission']);
        Route::patch('/permissions/update-permission/{permission}', [PermissionsController::class, 'updatePermission']);
        Route::post('/permissions/create-permission', [PermissionsController::class, 'createPermission']);
    });
});

Route::get('category-list', [CategoryController::class, 'getList']);
Route::get('get-posts', [PostController::class, 'getPosts']);
Route::get('get-category-posts/{id}', [PostController::class, 'getCategoryByPosts']);
Route::get('get-post/{id}', [PostController::class, 'getPost']);
