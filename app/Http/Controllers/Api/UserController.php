<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\PersonalDataExportJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function __construct()
    {
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

    /**
     * Retreive the user by sanctum middleware.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        if (auth('sanctum')->check()) {
            return response()->json(auth('sanctum')->user());
        }
    }

    /**
     * Retreive the user by sanctum authtoken.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function userByToken(Request $request)
    {
        $data = $request->validate([
            'token' => 'required|string|min:40',
        ]);

        $token = PersonalAccessToken::findToken($data['token']);
        $user = $token->tokenable;

        auth()->login($user);

        return response()->json($user);
    }

    /**
     * Process request to download user data.
     *
     * @param  \App\Models\User  $user
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function exportUserPersonalData(User $user, Request $request)
    {
        if (! auth('sanctum')->check()) {
            abort(403);
        }

        $currentUser = auth('sanctum')->user();

        if ($currentUser->id != $user->id) {
            abort(403);
        }

        dispatch(new PersonalDataExportJob($currentUser));

        return response()->json([
            'status'    => 'success',
            'user'      => null,
        ]);
    }

    /**
     * Delete the users account.
     *
     * @param  \App\Models\User  $user
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deleteUserAccount(User $user, Request $request)
    {
        if (! auth('sanctum')->check()) {
            abort(403);
        }

        $currentUser = auth('sanctum')->user();

        if ($currentUser->id != $user->id) {
            abort(403);
        }

        // HERE :: TODO :: Trigger goodbye email.
        // Do we do soft delete and restore user system? Maybe later like in the auth project.

        $user->tokens()->delete();
        $user->delete();
        $this->guard()->logout();

        return response()->json([
            'status'    => 'success',
            'user'      => null,
        ]);
    }
}
