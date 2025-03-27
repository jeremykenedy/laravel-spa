<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'password' => 'required|min:6|max:255|confirmed',
        ]);
        $user->update(['password' => Hash::make($request->password)]);

        return response()->json([
            'message' => 'Password Updated Successfully',
        ], 200);
    }
}
