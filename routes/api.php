<?php

use App\Http\Controllers\Admin\AppSettingsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ServerInfoController;
use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\BrowserSessionController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PermissionsController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ImpersonateController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\Auth\VerificationController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['forceHTTPS']], function () {
    Route::post('forget-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('forget.password.post');
    Route::post('reset-password', [ResetPasswordController::class, 'reset'])->name('password.reset');
    Route::post('/verify-email/{id}/{hash}', [VerificationController::class, 'verify'])->name('verify');
    Route::get('category-list', [CategoryController::class, 'getList']);
    Route::get('get-posts', [PostController::class, 'getPosts']);
    Route::get('get-category-posts/{id}', [PostController::class, 'getCategoryByPosts']);
    Route::get('get-post/{id}', [PostController::class, 'getPost']);
    Route::post('/user-by-token', [UserController::class, 'userByToken']);

    Route::get('/logins', [SocialiteController::class, 'loginsEnabled']);
    Route::post('/oauth/{driver}', [SocialiteController::class, 'getSocialRedirect']);
    Route::get('/oauth/{driver}/callback', [SocialiteController::class, 'handleSocialCallback'])->name('oauth.callback');
    Route::post('/oauth-revoke/{provider}', [SocialiteController::class, 'revokeSocialProvider']);

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::apiResource('posts', PostController::class);
        Route::apiResource('categories', CategoryController::class);
        Route::get('category-list', [CategoryController::class, 'getList']);
        Route::get('/user', [ProfileController::class, 'user']);
        Route::put('/user', [ProfileController::class, 'update']);
        Route::post('/toggle-dark-mode', [ProfileController::class, 'darkModeToggle']);
        Route::get('browser-sessions', [BrowserSessionController::class, 'index']);
        Route::post('logout-other-devices', [BrowserSessionController::class, 'logoutOtherDevices']);
        Route::get('activity-logs', ActivityLogController::class);
        Route::post('/verify-resend', [VerificationController::class, 'resend']);
        Route::post('/impersonate/take/{user}', [ImpersonateController::class, 'impersonate'])->name('users.impersonate');
        Route::post('/impersonate/leave', [ImpersonateController::class, 'leaveImpersonate'])->name('users.leaveImpersonate');
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
        Route::get('/server-info', [ServerInfoController::class, 'index']);
        Route::get('/app-settings', [AppSettingsController::class, 'index']);
        Route::patch('/app-settings/{setting}', [AppSettingsController::class, 'updateSetting']);
        Route::get('/dashboard/data', [DashboardController::class, 'dashboardData']);
        Route::post('/user/{user}/data', [UserController::class, 'exportUserPersonalData']);
        Route::patch('/password', PasswordController::class);

        Route::group(['middleware' => ['role:superadmin']], function () {
            // Things should be done using checks within the requests
        });
    });
});
