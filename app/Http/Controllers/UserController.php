<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    public function __invoke(Request $request)
    {
        if(auth("sanctum")->check()){
            return response()->json(auth("sanctum")->user());
        }
    }
}
