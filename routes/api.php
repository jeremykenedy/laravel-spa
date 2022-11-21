<?php

use App\Http\Controllers\AppSettingsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VerificationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('guest')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', RegisterController::class);
    Route::post('/forgot-password', ForgotPasswordController::class);
    Route::post('/reset-password', ResetPasswordController::class);
});

Route::post('/verify-email/{id}/{hash}', [VerificationController::class, 'verify'])->name('verify');
Route::post('/verify-resend', [VerificationController::class, 'resend']);
Route::get('/user', UserController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::patch('/profile', [ProfileController::class, 'profile']);
    Route::patch('/theme', [ProfileController::class, 'theme']);
    Route::patch('/password', PasswordController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
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
    Route::get('/dashboard/data', [DashboardController::class, 'dashboardData']);
    Route::get('/app-settings', [AppSettingsController::class, 'index']);
    Route::patch('/app-settings/{setting}', [AppSettingsController::class, 'updateSetting']);
});
