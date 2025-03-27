<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $token = $request->user()->createToken($request->userAgent())->plainTextToken;

        try {
            activity()
                ->performedOn($request->user())
                ->causedBy(auth()->user())
                ->event('login')
                ->withProperties(['ip' => $request->ip()])
                ->log('User login successfully');
        } catch (Exception $e) {
            //
        }

        if ($request->wantsJson()) {
            return response()->json(['user' => $request->user(), 'token' => $token]);
        }

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        try {
            activity()
                ->performedOn($request->user())
                ->causedBy(auth()->user())
                ->event('logout')
                ->withProperties(['ip' => $request->ip()])
                ->log('User logout successfully');
        } catch (Exception $e) {
            //
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        if ($request->wantsJson()) {
            return response()->noContent();
        }

        return redirect('/');
    }

    /**
     * Create User.
     *
     * @param  RegisterRequest  $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $user = User::where('email', $request['email'])->first();
        if ($user) {
            return response(['error' => 1, 'message' => 'user already exists'], 409);
        }

        $user = User::create([
            'email'    => $request['email'],
            'password' => Hash::make($request['password']),
            'name'     => $request['name'],
        ]);

        return $this->successResponse($user, 'Registration Successfully');
    }
}
