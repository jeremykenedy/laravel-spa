<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\DeleteUserRequest;
use App\Http\Requests\Users\RestoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Requests\Users\VerifyUserRequest;
use App\Http\Requests\Users\ViewUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
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

    /**
     * Tap the guard we need.
     *
     * @param  string  $guard
     * @return middleware guard
     */
    protected function guard($guard = 'web')
    {
        return Auth::guard($guard);
    }

    public function users(ViewUserRequest $request)
    {
        $per = 25;
        $sortBy = 'id';
        $sortType = 'asc';

        if ($request->has('per')) {
            $per = $request->input('per');
        }

        if ($request->has('sortBy')) {
            $sortBy = $request->input('sortBy');
        }

        if ($request->has('sortType')) {
            $sortType = $request->input('sortType');
        }

        $query = User::orderBy($sortBy, $sortType);

        if ($request->has('search') && $request->input('search') != 'null') {
            $query->where('name', 'LIKE', '%'.$request->input('search').'%')
                ->orWhere('email', 'LIKE', '%'.$request->input('search').'%');
        }

        return response()->json($query->paginate($per));
    }

    public function toggleVerify(VerifyUserRequest $request)
    {
        $data = $request->all();
        $user = User::findOrFail($data['user']['id']);
        if ($data['action'] == 'unVerifyUser') {
            $user->email_verified_at = null;
        } else {
            $user->email_verified_at = now();
        }
        $user->save();
        $user->load('roles');

        return response()->json($user);
    }

    public function createUser(CreateUserRequest $request)
    {
        $validated = $request->validated();

        $email_verified_at = null;
        if ($validated['email_verified_at']) {
            $email_verified_at = now();
        }

        $user = User::create([
            'name'              => $validated['name'],
            'email'             => $validated['email'],
            'theme_dark'        => $validated['theme_dark'],
            'email_verified_at' => $email_verified_at,
            'password'          => Hash::make($validated['password']),
        ]);

        if ($user) {
            $user->syncRoles($validated['roles']);

            // Careful: Using this will not auto-detach roles for users.
            // $user->syncPermissions($request->validated('permissions'));

            // event(new Registered($user));

            return response()->json([
                'user'  => $user,
            ]);
        }
    }

    public function updateUser(UpdateUserRequest $request, User $user)
    {
        $request->validate([
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
        ]);

        if ($request->email_verified_at == true) {
            $email_verified_at = now();
        } elseif ($request->email_verified_at == false) {
            $email_verified_at = null;
        } else {
            $email_verified_at = $user->email_verified_at;
        }

        $user->update($request->only([
            'name',
            'email',
            'theme_dark',
        ]));

        $user->update([
            'email_verified_at' => $email_verified_at,
        ]);

        if ($request->validated(['password'])) {
            $user->update([
                'password' => $request->validated(['password']),
            ]);
        }

        $user->syncRoles($request->validated('roles'));

        // Careful: Using this will not auto-detach roles for users.
        // $user->syncPermissions($request->validated('permissions'));

        return response()->json([
            'user'  => $user,
        ]);
    }

    public function restorUser(RestoreUserRequest $request, User $user)
    {
        $user->restore();

        return response()->json($user);
    }

    public function deleteUser(DeleteUserRequest $request, User $user)
    {
        $user->delete();

        return response()->json($user);
    }

    public function destroyUser(DeleteUserRequest $request, User $user)
    {
        $user->forceDelete();

        return response()->json($user);
    }
}
