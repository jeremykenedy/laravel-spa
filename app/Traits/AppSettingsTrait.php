<?php

namespace App\Traits;

use App\Models\Setting;

trait AppSettingsTrait
{
    /**
     * Process the settings for additional app needs.
     *
     * @param  \App\Models\Setting  $setting
     * @return \App\Models\Setting
     */
    public function processSettingForAdditionalAppChanges(Setting $setting)
    {
        if ($setting->key == 'enableSentryMonitoring') {
            $this->setEnv('SENTRY_IO_ENABLED', $setting->val, config('services.sentry.enabled'));
            putenv('SENTRY_IO_ENABLED='.$setting->val);
            config(['services.sentry.enabled' => $setting->val]);
        }
        if ($setting->key == 'sentryIoDSN') {
            $this->setEnv('SENTRY_LARAVEL_DSN', $setting->val, config('sentry.dsn'));
            putenv('SENTRY_LARAVEL_DSN='.$setting->val);
            config(['sentry.dsn' => $setting->val]);
        }
        if ($setting->key == 'enableSentryMonitoringFeedbakForm') {
            $this->setEnv('SENTRY_IO_USER_FEEDBACK_ENABLED', $setting->val, config('services.sentry.feedback-enabled'));
            putenv('SENTRY_IO_USER_FEEDBACK_ENABLED='.$setting->val);
            config(['services.sentry.feedback-enabled' => $setting->val]);
        }
    }

    /**
     * Set .env variables directly to the file.
     *
     * @param  string  $key
     * @param  string|null  $value
     * @param  string|null  $configed
     */
    public function setEnv(string $key, $value, $configed = null)
    {
        $term = $configed != null ? $configed : env($key);
        $path = app()->environmentFilePath();
        $escaped = preg_quote('='.$term, '/');

        file_put_contents($path, preg_replace(
            "/^{$key}{$escaped}/m",
            "{$key}={$value}",
            file_get_contents($path)
        ));

        if (file_exists(\App::getCachedConfigPath())) {
            \Artisan::call('config:cache');
        }
    }
}
