<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UsersController extends Controller
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

    public function users(Request $request)
    {
        $per = 10;
        if ($request->has('per')) {
           $per = $request->input('per');
        }

        return response()->json(User::paginate($per));
    }
}
