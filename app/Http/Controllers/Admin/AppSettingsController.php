<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ShowAppSettingsRequest;
use App\Http\Requests\Admin\UpdateAppSettingsRequest;
use App\Models\Setting;
use App\Traits\AppSettingsTrait;

class AppSettingsController extends Controller
{
    use AppSettingsTrait;

    public function __construct()
    {
        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    public function index(ShowAppSettingsRequest $request)
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

    public function updateSetting(UpdateAppSettingsRequest $request, Setting $setting)
    {
        $setting->val = $request->val;
        $setting->save();

        $this->processSettingForAdditionalAppChanges($setting);

        return response()->json([
            'data'  => $setting,
        ]);
    }
}
