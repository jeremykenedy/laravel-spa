<?php

namespace App\Traits;

use App\Models\Setting;
use Illuminate\Support\Facades\Artisan;

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

        if ($setting->key == 'appApplePrivateKey') {
            $this->setEnv('APPLE_PRIVATE_KEY', $setting->val, config('services.apple.private_key'));
            putenv('APPLE_PRIVATE_KEY='.$setting->val);
            config(['services.apple.private_key' => $setting->val]);
        }
        if ($setting->key == 'appAppleTeamId') {
            $this->setEnv('APPLE_TEAM_ID', $setting->val, config('services.apple.team_id'));
            putenv('APPLE_TEAM_ID='.$setting->val);
            config(['services.apple.team_id' => $setting->val]);
        }
        if ($setting->key == 'appAppleKeyId') {
            $this->setEnv('APPLE_KEY_ID', $setting->val, config('services.apple.key_id'));
            putenv('APPLE_KEY_ID='.$setting->val);
            config(['services.apple.key_id' => $setting->val]);
        }
        if ($setting->key == 'appAppleId') {
            $this->setEnv('APPLE_CLIENT_ID', $setting->val, config('services.apple.client_id'));
            putenv('APPLE_CLIENT_ID='.$setting->val);
            config(['services.apple.client_id' => $setting->val]);
        }
        if ($setting->key == 'appAppleSecret') {
            $this->setEnv('APPLE_CLIENT_SECRET', $setting->val, config('services.apple.client_secret'));
            putenv('APPLE_CLIENT_SECRET='.$setting->val);
            config(['services.apple.client_secret' => $setting->val]);
        }
        if ($setting->key == 'appAppleRedirect') {
            $this->setEnv('APPLE_REDIRECT_URI', $setting->val, config('services.apple.redirect'));
            putenv('APPLE_REDIRECT_URI='.$setting->val);
            config(['services.apple.redirect' => $setting->val]);
        }

        if ($setting->key == 'appStackExchangeSite') {
            $this->setEnv('STACKEXCHANGE_CLIENT_SITE', $setting->val, config('services.stackexchange.site'));
            putenv('STACKEXCHANGE_CLIENT_SITE='.$setting->val);
            config(['services.stackexchange.site' => $setting->val]);
        }
        if ($setting->key == 'appStackExchangeKey') {
            $this->setEnv('STACKEXCHANGE_CLIENT_KEY', $setting->val, config('services.stackexchange.key'));
            putenv('STACKEXCHANGE_CLIENT_KEY='.$setting->val);
            config(['services.stackexchange.key' => $setting->val]);
        }
        if ($setting->key == 'appStackExchangeId') {
            $this->setEnv('STACKEXCHANGE_CLIENT_ID', $setting->val, config('services.stackexchange.client_id'));
            putenv('STACKEXCHANGE_CLIENT_ID='.$setting->val);
            config(['services.stackexchange.client_id' => $setting->val]);
        }
        if ($setting->key == 'appStackExchangeSecret') {
            $this->setEnv('STACKEXCHANGE_CLIENT_SECRET', $setting->val, config('services.stackexchange.client_secret'));
            putenv('STACKEXCHANGE_CLIENT_SECRET='.$setting->val);
            config(['services.stackexchange.client_secret' => $setting->val]);
        }
        if ($setting->key == 'appStackExchangeRedirect') {
            $this->setEnv('STACKEXCHANGE_REDIRECT_URI', $setting->val, config('services.stackexchange.redirect'));
            putenv('STACKEXCHANGE_REDIRECT_URI='.$setting->val);
            config(['services.stackexchange.redirect' => $setting->val]);
        }

        if ($setting->key == 'appGitLabId') {
            $this->setEnv('GITLAB_CLIENT_ID', $setting->val, config('services.gitlab.client_id'));
            putenv('GITLAB_CLIENT_ID='.$setting->val);
            config(['services.gitlab.client_id' => $setting->val]);
        }
        if ($setting->key == 'appGitLabSecret') {
            $this->setEnv('GITLAB_CLIENT_SECRET', $setting->val, config('services.gitlab.client_secret'));
            putenv('GITLAB_CLIENT_SECRET='.$setting->val);
            config(['services.gitlab.client_secret' => $setting->val]);
        }
        if ($setting->key == 'appGitLabRedirect') {
            $this->setEnv('GITLAB_REDIRECT_URI', $setting->val, config('services.gitlab.redirect'));
            putenv('GITLAB_REDIRECT_URI='.$setting->val);
            config(['services.gitlab.redirect' => $setting->val]);
        }

        if ($setting->key == 'appRedditId') {
            $this->setEnv('REDDIT_CLIENT_ID', $setting->val, config('services.reddit.client_id'));
            putenv('REDDIT_CLIENT_ID='.$setting->val);
            config(['services.reddit.client_id' => $setting->val]);
        }
        if ($setting->key == 'appRedditSecret') {
            $this->setEnv('REDDIT_CLIENT_SECRET', $setting->val, config('services.reddit.client_secret'));
            putenv('REDDIT_CLIENT_SECRET='.$setting->val);
            config(['services.reddit.client_secret' => $setting->val]);
        }
        if ($setting->key == 'appRedditResponseType') {
            $this->setEnv('REDDIT_RESPONSE_TYPE', $setting->val, config('services.reddit.response_type'));
            putenv('REDDIT_RESPONSE_TYPE='.$setting->val);
            config(['services.reddit.response_type' => $setting->val]);
        }
        if ($setting->key == 'appRedditState') {
            $this->setEnv('REDDIT_STATE', $setting->val, config('services.reddit.state'));
            putenv('REDDIT_STATE='.$setting->val);
            config(['services.reddit.state' => $setting->val]);
        }
        if ($setting->key == 'appRedditRedirect') {
            $this->setEnv('REDDIT_REDIRECT_URI', $setting->val, config('services.reddit.redirect'));
            putenv('REDDIT_REDIRECT_URI='.$setting->val);
            config(['services.reddit.redirect' => $setting->val]);
        }

        if ($setting->key == 'appSnapchatId') {
            $this->setEnv('SNAPCHAT_CLIENT_ID', $setting->val, config('services.snapchat.client_id'));
            putenv('SNAPCHAT_CLIENT_ID='.$setting->val);
            config(['services.snapchat.client_id' => $setting->val]);
        }
        if ($setting->key == 'appSnapchatSecret') {
            $this->setEnv('SNAPCHAT_CLIENT_SECRET', $setting->val, config('services.snapchat.client_secret'));
            putenv('SNAPCHAT_CLIENT_SECRET='.$setting->val);
            config(['services.snapchat.client_secret' => $setting->val]);
        }
        if ($setting->key == 'appSnapchatRedirect') {
            $this->setEnv('SNAPCHAT_REDIRECT_URI', $setting->val, config('services.snapchat.redirect'));
            putenv('SNAPCHAT_REDIRECT_URI='.$setting->val);
            config(['services.snapchat.redirect' => $setting->val]);
        }

        if ($setting->key == 'appMeetupId') {
            $this->setEnv('MEETUP_CLIENT_ID', $setting->val, config('services.meetup.client_id'));
            putenv('MEETUP_CLIENT_ID='.$setting->val);
            config(['services.meetup.client_id' => $setting->val]);
        }
        if ($setting->key == 'appMeetupSecret') {
            $this->setEnv('MEETUP_CLIENT_SECRET', $setting->val, config('services.meetup.client_secret'));
            putenv('MEETUP_CLIENT_SECRET='.$setting->val);
            config(['services.meetup.client_secret' => $setting->val]);
        }
        if ($setting->key == 'appMeetupRedirect') {
            $this->setEnv('MEETUP_REDIRECT_URI', $setting->val, config('services.meetup.redirect'));
            putenv('MEETUP_REDIRECT_URI='.$setting->val);
            config(['services.meetup.redirect' => $setting->val]);
        }

        if ($setting->key == 'appAtlassianId') {
            $this->setEnv('ATLASSIAN_CLIENT_ID', $setting->val, config('services.atlassian.client_id'));
            putenv('ATLASSIAN_CLIENT_ID='.$setting->val);
            config(['services.atlassian.client_id' => $setting->val]);
        }
        if ($setting->key == 'appAtlassianSecret') {
            $this->setEnv('ATLASSIAN_CLIENT_SECRET', $setting->val, config('services.atlassian.client_secret'));
            putenv('ATLASSIAN_CLIENT_SECRET='.$setting->val);
            config(['services.atlassian.client_secret' => $setting->val]);
        }
        if ($setting->key == 'appAtlassianRedirect') {
            $this->setEnv('ATLASSIAN_REDIRECT_URI', $setting->val, config('services.atlassian.redirect'));
            putenv('ATLASSIAN_REDIRECT_URI='.$setting->val);
            config(['services.atlassian.redirect' => $setting->val]);
        }
        if ($setting->key == 'appName') {
            $this->setEnv('APP_NAME', "'".$setting->val."'", "'".config('app.name')."'");
            putenv('APP_NAME='.$setting->val);
            config(['app.name' => $setting->val]);
        }
        if ($setting->key == 'author') {
            $this->setEnv('APP_AUTHOR', "'".$setting->val."'", "'".config('settings.author')."'");
            putenv('APP_AUTHOR='.$setting->val);
            config(['settings.author' => $setting->val]);
        }
        if ($setting->key == 'description') {
            $this->setEnv('APP_DESC', "'".$setting->val."'", "'".config('settings.description')."'");
            putenv('APP_DESC='.$setting->val);
            config(['settings.description' => $setting->val]);
        }
        if ($setting->key == 'keywords') {
            $this->setEnv('APP_KEYWORDS', "'".$setting->val."'", "'".config('settings.keywords')."'");
            putenv('APP_KEYWORDS='.$setting->val);
            config(['settings.keywords' => $setting->val]);
        }
        if ($setting->key == 'enableKonamiAsteroids') {
            $this->setEnv('KONAMI_ASTEROIDS_ENABLED', $setting->val, config('settings.enableKonamiAsteroids'));
            putenv('KONAMI_ASTEROIDS_ENABLED='.$setting->val);
            config(['settings.enableKonamiAsteroids' => $setting->val]);
        }
        if ($setting->key == 'enableKonamiToasty') {
            $this->setEnv('KONAMI_TOASTY_ENABLED', $setting->val, config('settings.enableKonamiToasty'));
            putenv('KONAMI_TOASTY_ENABLED='.$setting->val);
            config(['settings.enableKonamiToasty' => $setting->val]);
        }

        // Artisan::call('config:cache');

        // NEW_PROVIDER_PLUG :: Put New Provider HERE
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
