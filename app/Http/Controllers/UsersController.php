<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UsersController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:sanctum');

        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    public function users()
    {


        $users = User::all();



        return response()->json([
            'code'      => 200,
            'message'   => 'Here are all the users',
            'data'      => ['users' => $users],
        ], Response::HTTP_OK);
    }

    // public function __invoke(Request $request)
    // {
    //     if (auth('sanctum')->check()) {
    //         return response()->json(auth('sanctum')->user());
    //     }
    // }
}
