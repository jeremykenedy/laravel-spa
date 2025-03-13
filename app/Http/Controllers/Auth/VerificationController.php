<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Email Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling email verification for any
    | user that recently registered with the application. Emails may also
    | be re-sent if the user didn't receive the original email message.
    |
    */

    use VerifiesEmails;

    /**
     * Where to redirect users after verification.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function verify(Request $request)
    {
        $user = User::findOrFail($request->route('id'));

        if (
            ! hash_equals((string) $request->route('id'), (string) $user->getKey())
            || ! hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))
        ) {
            return response()->json(['message' => 'Verification error ! Try again'], 500);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'already verified !'], 200);
        }

        if ($user->markEmailAsVerified()) {
            return response()->json(['message' => 'email verified successfully !'], 200);
        }

        return response()->json(['verified' => true]);
    }

    /**
     * Resend the email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function resend(Request $request)
    {
        $this->validate($request, ['id' => 'required']);

        $user = User::find($request->id);

        if (! $user) {
            return response()->json(['message' => 'Verification error '], 500);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'already verified !'], 200);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'verification email has been resent !', 200]);
    }
}
