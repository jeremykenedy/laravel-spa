<?php

namespace App\View\Composers;

use App\Models\Setting;
use Illuminate\View\View;

class GaComposer
{
    protected $key;

    /**
     * Create a new instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->key = Setting::where('key', 'appGoogleAnalyticsKey')->first();
    }

    /**
     * Bind data to the view.
     *
     * @param  \Illuminate\View\View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $val = null;

        if ($this->key) {
            $val = $this->key->val;
        }

        $view->with('ga_key', $val);
    }
}
