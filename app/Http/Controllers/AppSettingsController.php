<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Traits\AppSettingsTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AppSettingsController extends Controller
{
    use AppSettingsTrait;

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
            'authSettings'          => $settings->where('group', 'auth')->values(),
            'analyticsSettings'     => $settings->where('group', 'analytics')->values(),
            'generalSettings'       => $settings->where('group', 'general')->values(),
            'monitoringSettings'    => $settings->where('group', 'monitoring')->values(),
            'metaSettings'          => $settings->where('group', 'app-meta')->values(),
            'secretSettings'        => $settings->where('group', 'secrets')->values(),
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

        $this->processSettingForAdditionalAppChanges($setting);

        return response()->json([
            'data'  => $setting,
        ]);
    }
}
