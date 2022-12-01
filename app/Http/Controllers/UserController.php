<?php

namespace App\Http\Controllers;

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

    public function user(Request $request)
    {
        if (auth('sanctum')->check()) {
            return response()->json(auth('sanctum')->user());
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

        return response()->json($user);
    }
}
