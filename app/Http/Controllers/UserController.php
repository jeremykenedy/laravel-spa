<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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

    protected function relationships(User $user)
    {
        return $user->load([
            // 'socialiteProviders',
            // 'roles',
        ]);
    }

    public function user(Request $request)
    {
        if (auth('sanctum')->check()) {
            return response()->json($this->relationships(auth('sanctum')->user()));
        }
    }

    public function userByToken(Request $request)
    {
        $data = $request->validate([
            'token' => 'required|string',
        ]);

        $token = PersonalAccessToken::findToken($data['token']);
        $user = $token->tokenable;

        auth()->login($user);

        return response()->json($this->relationships($user));
    }
}
