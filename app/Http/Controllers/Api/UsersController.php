<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\GetUserRolesRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Resources\Users\UsersCollection;
use App\Http\Resources\Users\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('role:superadmin');

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

    public function users(Request $request)
    {
        $per = 10;
        $sortBy = 'id';
        $sortType = 'asc';

        if ($request->has('per')) {
            $per = $request->input('per');

            if (strtolower($per) == 'all') {
                $per = 1000000000000;
            }

        }

        if ($request->has('sortBy')) {
            $sortBy = $request->input('sortBy');
        }

        if ($request->has('sortType')) {
            $sortType = $request->input('sortType');
        }

        return response()->json(User::orderBy($sortBy, $sortType)->paginate($per));
    }

    public function toggleVerify(Request $request)
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

        $email_verified_at = false;
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

            // event(new Registered($user));

            return response()->json([
                'user'  => $user,
            ]);
        }
    }

    public function updateUser(UpdateUserRequest $request, User $user)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email,'.$user->id,
        ]);

        $validated = $request->validated();
        $user->update($request->only('name', 'email', 'theme_dark', 'email_verified_at'));
        $user->syncRoles($validated['roles']);

        return response()->json([
            'user'  => $user,
        ]);
    }

    public function deleteUser(Request $request, User $user)
    {
        $user->delete();

        return response()->json($user);
    }
}
