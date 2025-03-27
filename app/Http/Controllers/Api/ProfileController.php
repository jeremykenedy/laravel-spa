<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    /**
     * @throws ValidationException
     */
    public function update(UpdateProfileRequest $request)
    {
        $profile = Auth::user();
        $profile->name = $request->name;
        $profile->email = $request->email;

        if ($profile->save()) {
            return $this->successResponse($profile, 'User updated');
        }

        return response()->json(['status' => 403, 'success' => false]);
    }

    public function user(Request $request)
    {
        $user = $request->user();

        return $this->successResponse($user, 'User found');
    }

    public function darkModeToggle(Request $request)
    {
        $user = Auth::user();
        $user->theme_dark = ! $user->theme_dark;

        if ($user->save()) {
            return $this->successResponse($user->theme_dark, 'Mode Switched');
        }

        return response()->json(['status' => 403, 'success' => false]);
    }
}
