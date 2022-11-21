<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\GetUserRolesRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Resources\Users\RolesCollection;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
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

    public function users(Request $request)
    {
        $per = 10;
        if ($request->has('per')) {
            $per = $request->input('per');
        }

        return response()->json(User::paginate($per));
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
