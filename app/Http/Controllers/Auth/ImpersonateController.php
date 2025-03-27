<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\ImpersonateUserRequest;
use App\Http\Requests\Users\LeaveImpersonateUserRequest;
use App\Models\Impersonation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ImpersonateController extends Controller
{
    public const IMPERSONATOR_TOKEN = 'IMPERSONATOR token';
    public const IMPERSONATION_TOKEN = 'IMPERSONATION token';

    public function __construct()
    {
        $this->middleware('auth:sanctum');

        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    /**
     * Impersonate a user, store the token for returning.
     *
     * @param  \App\Http\Requests\Users\ImpersonateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function impersonate(ImpersonateUserRequest $request, User $user)
    {
        $impersonator = auth('sanctum')->user();
        $impersonatee = $user;

        if ($impersonatee && $impersonatee->id && ($impersonatee->id == $impersonator->id)) {
            abort(418);
        }

        if (! $impersonatee || ! $impersonatee->canBeImpersonated() || ! $impersonator->canImpersonate()) {
            abort(403);
        }

        $impersonatorToken = $impersonator->createToken(ImpersonateController::IMPERSONATOR_TOKEN);
        $impersonateeToken = $impersonatee->createToken(ImpersonateController::IMPERSONATION_TOKEN);

        $impersonation = Impersonation::create([
            'user_id'                   => $impersonator->id,
            'personal_access_token_id'  => $impersonateeToken->accessToken->id,
        ]);

        // $this->logoutUser($impersonator);

        $data = [
            'impersonatorToken' => $impersonatorToken,
            'token'             => $impersonateeToken->plainTextToken,
        ];

        return response()->json([
            'code'      => 200,
            'message'   => 'Here is the data you seek, use it wisely.',
            'data'      => $data,
        ], 200);
    }

    /**
     * Leave impersonating a user.
     *
     * @param  \App\Http\Requests\Users\ImpersonateUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function leaveImpersonate(LeaveImpersonateUserRequest $request)
    {
        $impersonator = null;
        $impersonatedUser = auth('sanctum')->user();
        $currentAccessToken = $impersonatedUser->tokens()->where('tokenable_type', 'App\\Models\\User')->where('tokenable_id', $impersonatedUser->id)->where('name', ImpersonateController::IMPERSONATION_TOKEN)->latest()->first();
        $impersonation = Impersonation::where('personal_access_token_id', $currentAccessToken->id)->first();
        $impersonatorToken = null;

        if ($impersonation) {
            $impersonator = User::find($impersonation->user_id);
        }
        if ($impersonator) {
            $impersonatorToken = $impersonator->createToken('API token')->plainTextToken;
        }

        $impersonatedUser->tokens()->delete();

        $data = [
            'token'         => $impersonatorToken,
        ];

        return response()->json([
            'code'      => 200,
            'message'   => 'Welcome back after your journey down the rabit hole.',
            'data'      => $data,
        ], 200);
    }

    /**
     * Logout a user herlper function.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function logoutUser($user)
    {
        $user->tokens()->delete();

        $this->guard()->logout();
    }

    /**
     * Access the web guard middleware.
     *
     * @param  string  $guard
     * @return App\Http\Kernel::middlewareGroups['web']
     */
    public function guard($guard = 'web')
    {
        return Auth::guard($guard);
    }
}
