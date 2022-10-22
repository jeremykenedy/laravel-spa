<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function profile(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'name'          => 'required',
            'email'         => 'required|email|unique:users,email,'.$user->id,
            'theme_dark'    => 'boolean',
        ]);
        $user->update($request->only('name', 'email', 'theme_dark'));

        return response()->json([
            'user'      => $user,
            'message'   => 'profile updated successfully .',
        ], 200);
    }

    public function theme(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'theme_dark'    => 'boolean',
        ]);
        $user->update($request->only('theme_dark'));

        return response()->json([
            'user'      => $user,
            'message'   => 'theme updated successfully .',
        ], 200);
    }
}
