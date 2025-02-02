<?php

namespace App\Providers;

use App\View\Composers\GaComposer;
use App\View\Composers\GaEnabledComposer;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer('*', GaComposer::class);
        View::composer('*', GaEnabledComposer::class);
    }
}
