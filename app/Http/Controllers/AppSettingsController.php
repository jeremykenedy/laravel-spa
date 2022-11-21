<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use QCod\Settings\Setting\Setting;

class AppSettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $authSettings = Setting::whereGroup('auth')->get();

        return response()->json([
            'authSettings'  => $authSettings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function updateSetting(Request $request, Setting $setting)
    {
        $setting->val = $request->val;
        $setting->save();

        return response()->json([
            'data'  => $setting,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
