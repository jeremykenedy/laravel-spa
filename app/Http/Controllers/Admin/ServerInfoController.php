<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ShowServerInfoRequest;

class ServerInfoController extends Controller
{
    public function __construct()
    {
        try {
            ob_start('ob_gzhandler');
        } catch (\Exception $e) {
            //
        }
    }

    public function index(ShowServerInfoRequest $request)
    {
        ob_start();
        phpinfo();
        $pinfo = ob_get_contents();
        ob_end_clean();
        $pinfo = preg_replace('%^.*<body>(.*)</body>.*$%ms', '$1', $pinfo);

        return response()->json([
            'info'  => $pinfo,
        ]);
    }
}
