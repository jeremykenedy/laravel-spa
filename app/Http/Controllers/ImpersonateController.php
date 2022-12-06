<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\ImpersonateUserRequest;
use App\Models\User;
use App\Models\Impersonation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class ImpersonateController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');

        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    public function impersonate(ImpersonateUserRequest $request, User $user)
    {
        $impersonator = auth('sanctum')->user();
        $impersonatee = $user;

        if($impersonatee && $impersonatee->id && ($impersonatee->id == $impersonator->id)) {
            abort(418);
        }

        if (!$impersonatee || !$impersonatee->canBeImpersonated() || !$impersonator->canImpersonate()) {
            abort(403);
        }

        $impersonatorToken = $impersonator->createToken('IMPERSONATOR token');
        $impersonateeToken = $impersonatee->createToken('IMPERSONATION token');

        $impersonation = Impersonation::create([
            'user_id'                   => $impersonator->id,
            'personal_access_token_id'  => $impersonateeToken->accessToken->id,
        ]);

        $this->logoutUser($impersonator);

        $data = [
            "impersonatorToken" => $impersonatorToken,
            "token"             => $impersonateeToken->plainTextToken,
        ];

        return response()->json([
            'code'      => 200,
            'message'   => 'Here is the data you seek, use it wisely.',
            'data'      => $data,
        ], 200);
    }

    public function leaveImpersonate()
    {
        $impersonatedUser = auth('sanctum')->user();
        $currentAccessToken = $impersonatedUser->tokens()->where('tokenable_type', 'App\\Models\\User')->where('tokenable_id', $impersonatedUser->id)->latest()->first();
        $impersonation = Impersonation::where('personal_access_token_id', $currentAccessToken->id)->first();
        $impersonator = User::find($impersonation->user_id);
        $impersonatorToken = $impersonator->createToken('API token')->plainTextToken;

        $this->logoutUser($impersonatedUser);

        $data = [
            "token"         => $impersonatorToken,
        ];

        return response()->json([
            'code'      => 200,
            'message'   => 'Welcome back after your journey down the rabit hole.',
            'data'      => $data,
        ], 200);
    }

    public function logoutUser($user)
    {
        $user->tokens()->delete();

        $this->guard()->logout();
    }

    public function guard($guard = 'web')
    {
        return Auth::guard($guard);
    }
}
