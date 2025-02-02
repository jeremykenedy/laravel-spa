<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Cjmellor\BrowserSessions\Facades\BrowserSessions;

class BrowserSessionController extends Controller
{
    public function index()
    {
        $sessions = BrowserSessions::sessions();

        return response()->json($sessions);
    }

    public function logoutOtherDevices()
    {
        return BrowserSessions::logoutOtherBrowserSessions();
    }
}
