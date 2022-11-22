<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use QCod\Settings\Setting\Setting;

class AppSettingsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('role:super.admin');

        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $settings = Setting::all();

        return response()->json([
            'authSettings'      => $settings->where('group', 'auth'),
            'analyticsSettings' => $settings->where('group', 'analytics'),
            'generalSettings'   => $settings->where('group', 'general'),
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
