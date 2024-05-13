<?php
namespace Corals\Modules\Payment\Crypto\Provider;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class CryptoRouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'Modules\Crypto\Http\Controllers';

    public function boot(): void
    {
        parent::boot();
    }

    public function map(): void
    {
        $this->mapApiRoutes();
    }

    protected function mapApiRoutes(): void
    {
        Route::prefix('api/' . config('corals.api_version'))
            ->middleware('api')
            ->namespace($this->namespace . '\API')
            ->group(__DIR__ . '/../Routes/api.php');
    }
}
