<?php

declare(strict_types=1);

namespace App\Traits;

use App\Models\Setting;
use App\Models\SocialiteProvider;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Crypt;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;

trait SocialiteProvidersTrait
{
    private $providerSettings;

    private $providerConfigs;

    public function __construct()
    {
        $this->setupProviders();
    }

    /**
     * Set the private vars and the apps config dynamically.
     */
    protected function setupProviders()
    {
        $this->setProviderSettings();
        $this->setProviderConfigs();
        $this->setAppProvidersConfigs();
    }

    /**
     * Set the private var $providerSettings.
     */
    protected function setProviderSettings()
    {
        $this->providerSettings = Setting::where('group', 'auth')
            ->where(function ($query) {
                $query->where('key', 'enableFbLogin')
                    ->orWhere('key', 'appFbId')
                    ->orWhere('key', 'appFbSecret')
                    ->orWhere('key', 'appFbRedirect')
                    ->orWhere('key', 'enableTwitterLogin')
                    ->orWhere('key', 'appTwitterId')
                    ->orWhere('key', 'appTwitterSecret')
                    ->orWhere('key', 'appTwitterRedirect')
                    ->orWhere('key', 'enableGoogleLogin')
                    ->orWhere('key', 'appGoogleId')
                    ->orWhere('key', 'appGoogleSecret')
                    ->orWhere('key', 'appGoogleRedirect')
                    ->orWhere('key', 'enableGitHubLogin')
                    ->orWhere('key', 'appGitHubId')
                    ->orWhere('key', 'appGitHubSecret')
                    ->orWhere('key', 'appGitHubRedirect')
                    ->orWhere('key', 'enableTwitchLogin')
                    ->orWhere('key', 'appTwitchId')
                    ->orWhere('key', 'appTwitchSecret')
                    ->orWhere('key', 'appTwitchRedirect')
                    ->orWhere('key', 'enableInstagramLogin')
                    ->orWhere('key', 'appInstagramId')
                    ->orWhere('key', 'appInstagramSecret')
                    ->orWhere('key', 'appInstagramRedirect')
                    ->orWhere('key', 'enableYouTubeLogin')
                    ->orWhere('key', 'appYouTubeId')
                    ->orWhere('key', 'appYouTubeSecret')
                    ->orWhere('key', 'appYouTubeRedirect')
                    ->orWhere('key', 'enableLinkedInLogin')
                    ->orWhere('key', 'appLinkedInId')
                    ->orWhere('key', 'appLinkedInSecret')
                    ->orWhere('key', 'appLinkedInRedirect')
                    ->orWhere('key', 'enableAppleLogin')
                    ->orWhere('key', 'appAppleId')
                    ->orWhere('key', 'appAppleSecret')
                    ->orWhere('key', 'appAppleRedirect')
                    ->orWhere('key', 'appApplePrivateKey')
                    ->orWhere('key', 'appAppleTeamId')
                    ->orWhere('key', 'appAppleKeyId')
                    ->orWhere('key', 'enableMicrosoftLogin')
                    ->orWhere('key', 'appMicrosoftId')
                    ->orWhere('key', 'appMicrosoftSecret')
                    ->orWhere('key', 'appMicrosoftRedirect')
                    ->orWhere('key', 'enableTikTokLogin')
                    ->orWhere('key', 'appTikTokId')
                    ->orWhere('key', 'appTikTokSecret')
                    ->orWhere('key', 'appTikTokRedirect')
                    ->orWhere('key', 'enableZoHoLogin')
                    ->orWhere('key', 'appZoHoId')
                    ->orWhere('key', 'appZoHoSecret')
                    ->orWhere('key', 'appZoHoRedirect')
                    ->orWhere('key', 'enableStackExchangeLogin')
                    ->orWhere('key', 'appStackExchangeId')
                    ->orWhere('key', 'appStackExchangeKey')
                    ->orWhere('key', 'appStackExchangeSite')
                    ->orWhere('key', 'appStackExchangeSecret')
                    ->orWhere('key', 'appStackExchangeRedirect')
                    ->orWhere('key', 'enableGitLabLogin')
                    ->orWhere('key', 'appGitLabId')
                    ->orWhere('key', 'appGitLabSecret')
                    ->orWhere('key', 'appGitLabRedirect')
                    ->orWhere('key', 'enableRedditLogin')
                    ->orWhere('key', 'appRedditId')
                    ->orWhere('key', 'appRedditSecret')
                    ->orWhere('key', 'appRedditResponseType')
                    ->orWhere('key', 'appRedditState')
                    ->orWhere('key', 'appRedditRedirect')
                    ->orWhere('key', 'enableSnapchatLogin')
                    ->orWhere('key', 'appSnapchatId')
                    ->orWhere('key', 'appSnapchatSecret')
                    ->orWhere('key', 'appSnapchatRedirect')
                    ->orWhere('key', 'enableMeetupLogin')
                    ->orWhere('key', 'appMeetupId')
                    ->orWhere('key', 'appMeetupSecret')
                    ->orWhere('key', 'appMeetupRedirect')
                    ->orWhere('key', 'enableAtlassianLogin')
                    ->orWhere('key', 'appAtlassianId')
                    ->orWhere('key', 'appAtlassianSecret')
                    ->orWhere('key', 'appAtlassianRedirect');
                // NEW_PROVIDER_PLUG :: Put New Provider HERE
            })->get();
    }

    /**
     * Set the private var $providerConfigs.
     */
    protected function setProviderConfigs()
    {
        $appGitHubId = $this->providerSettings->where('key', 'appGitHubId')->first();
        $appGitHubId = $appGitHubId ? $appGitHubId->val : null;
        $appGitHubSecret = $this->providerSettings->where('key', 'appGitHubSecret')->first();
        $appGitHubSecret = $appGitHubSecret ? $appGitHubSecret->val : null;
        $appGitHubRedirect = $this->providerSettings->where('key', 'appGitHubRedirect')->first();
        $appGitHubRedirect = $appGitHubRedirect ? $appGitHubRedirect->val : null;

        $appFbId = $this->providerSettings->where('key', 'appFbId')->first();
        $appFbId = $appFbId ? $appFbId->val : null;
        $appFbSecret = $this->providerSettings->where('key', 'appFbSecret')->first();
        $appFbSecret = $appFbSecret ? $appFbSecret->val : null;
        $appFbRedirect = $this->providerSettings->where('key', 'appFbRedirect')->first();
        $appFbRedirect = $appFbRedirect ? $appFbRedirect->val : null;

        $appTwitterId = $this->providerSettings->where('key', 'appTwitterId')->first();
        $appTwitterId = $appTwitterId ? $appTwitterId->val : null;
        $appTwitterSecret = $this->providerSettings->where('key', 'appTwitterSecret')->first();
        $appTwitterSecret = $appTwitterSecret ? $appTwitterSecret->val : null;
        $appTwitterRedirect = $this->providerSettings->where('key', 'appTwitterRedirect')->first();
        $appTwitterRedirect = $appTwitterRedirect ? $appTwitterRedirect->val : null;

        $appGoogleId = $this->providerSettings->where('key', 'appGoogleId')->first();
        $appGoogleId = $appGoogleId ? $appGoogleId->val : null;
        $appGoogleSecret = $this->providerSettings->where('key', 'appGoogleSecret')->first();
        $appGoogleSecret = $appGoogleSecret ? $appGoogleSecret->val : null;
        $appGoogleRedirect = $this->providerSettings->where('key', 'appGoogleRedirect')->first();
        $appGoogleRedirect = $appGoogleRedirect ? $appGoogleRedirect->val : null;

        $appYouTubeId = $this->providerSettings->where('key', 'appYouTubeId')->first();
        $appYouTubeId = $appYouTubeId ? $appYouTubeId->val : null;
        $appYouTubeSecret = $this->providerSettings->where('key', 'appYouTubeSecret')->first();
        $appYouTubeSecret = $appYouTubeSecret ? $appYouTubeSecret->val : null;
        $appYouTubeRedirect = $this->providerSettings->where('key', 'appYouTubeRedirect')->first();
        $appYouTubeRedirect = $appYouTubeRedirect ? $appYouTubeRedirect->val : null;

        $appTwitchId = $this->providerSettings->where('key', 'appTwitchId')->first();
        $appTwitchId = $appTwitchId ? $appTwitchId->val : null;
        $appTwitchSecret = $this->providerSettings->where('key', 'appTwitchSecret')->first();
        $appTwitchSecret = $appTwitchSecret ? $appTwitchSecret->val : null;
        $appTwitchRedirect = $this->providerSettings->where('key', 'appTwitchRedirect')->first();
        $appTwitchRedirect = $appTwitchRedirect ? $appTwitchRedirect->val : null;

        $appInstagramId = $this->providerSettings->where('key', 'appInstagramId')->first();
        $appInstagramId = $appInstagramId ? $appInstagramId->val : null;
        $appInstagramSecret = $this->providerSettings->where('key', 'appInstagramSecret')->first();
        $appInstagramSecret = $appInstagramSecret ? $appInstagramSecret->val : null;
        $appInstagramRedirect = $this->providerSettings->where('key', 'appInstagramRedirect')->first();
        $appInstagramRedirect = $appInstagramRedirect ? $appInstagramRedirect->val : null;

        $appLinkedInId = $this->providerSettings->where('key', 'appLinkedInId')->first();
        $appLinkedInId = $appLinkedInId ? $appLinkedInId->val : null;
        $appLinkedInSecret = $this->providerSettings->where('key', 'appLinkedInSecret')->first();
        $appLinkedInSecret = $appLinkedInSecret ? $appLinkedInSecret->val : null;
        $appLinkedInRedirect = $this->providerSettings->where('key', 'appLinkedInRedirect')->first();
        $appLinkedInRedirect = $appLinkedInRedirect ? $appLinkedInRedirect->val : null;

        $appAppleId = $this->providerSettings->where('key', 'appAppleId')->first();
        $appAppleId = $appAppleId ? $appAppleId->val : null;
        $appAppleSecret = $this->providerSettings->where('key', 'appAppleSecret')->first();
        $appAppleSecret = $appAppleSecret ? $appAppleSecret->val : null;
        $appAppleRedirect = $this->providerSettings->where('key', 'appAppleRedirect')->first();
        $appAppleRedirect = $appAppleRedirect ? $appAppleRedirect->val : null;
        $appApplePrivateKey = $this->providerSettings->where('key', 'appApplePrivateKey')->first();
        $appApplePrivateKey = $appApplePrivateKey ? $appApplePrivateKey->val : null;
        $appAppleTeamId = $this->providerSettings->where('key', 'appAppleTeamId')->first();
        $appAppleTeamId = $appAppleTeamId ? $appAppleTeamId->val : null;
        $appAppleKeyId = $this->providerSettings->where('key', 'appAppleKeyId')->first();
        $appAppleKeyId = $appAppleKeyId ? $appAppleKeyId->val : null;

        $appMicrosoftId = $this->providerSettings->where('key', 'appMicrosoftId')->first();
        $appMicrosoftId = $appMicrosoftId ? $appMicrosoftId->val : null;
        $appMicrosoftSecret = $this->providerSettings->where('key', 'appMicrosoftSecret')->first();
        $appMicrosoftSecret = $appMicrosoftSecret ? $appMicrosoftSecret->val : null;
        $appMicrosoftRedirect = $this->providerSettings->where('key', 'appMicrosoftRedirect')->first();
        $appMicrosoftRedirect = $appMicrosoftRedirect ? $appMicrosoftRedirect->val : null;

        $appTikTokId = $this->providerSettings->where('key', 'appTikTokId')->first();
        $appTikTokId = $appTikTokId ? $appTikTokId->val : null;
        $appTikTokSecret = $this->providerSettings->where('key', 'appTikTokSecret')->first();
        $appTikTokSecret = $appTikTokSecret ? $appTikTokSecret->val : null;
        $appTikTokRedirect = $this->providerSettings->where('key', 'appTikTokRedirect')->first();
        $appTikTokRedirect = $appTikTokRedirect ? $appTikTokRedirect->val : null;

        $appZoHoId = $this->providerSettings->where('key', 'appZoHoId')->first();
        $appZoHoId = $appZoHoId ? $appZoHoId->val : null;
        $appZoHoSecret = $this->providerSettings->where('key', 'appZoHoSecret')->first();
        $appZoHoSecret = $appZoHoSecret ? $appZoHoSecret->val : null;
        $appZoHoRedirect = $this->providerSettings->where('key', 'appZoHoRedirect')->first();
        $appZoHoRedirect = $appZoHoRedirect ? $appZoHoRedirect->val : null;

        $appStackExchangeId = $this->providerSettings->where('key', 'appStackExchangeId')->first();
        $appStackExchangeId = $appStackExchangeId ? $appStackExchangeId->val : null;
        $appStackExchangeKey = $this->providerSettings->where('key', 'appStackExchangeKey')->first();
        $appStackExchangeKey = $appStackExchangeKey ? $appStackExchangeKey->val : null;
        $appStackExchangeSite = $this->providerSettings->where('key', 'appStackExchangeSite')->first();
        $appStackExchangeSite = $appStackExchangeSite ? $appStackExchangeSite->val : null;
        $appStackExchangeSecret = $this->providerSettings->where('key', 'appStackExchangeSecret')->first();
        $appStackExchangeSecret = $appStackExchangeSecret ? $appStackExchangeSecret->val : null;
        $appStackExchangeRedirect = $this->providerSettings->where('key', 'appStackExchangeRedirect')->first();
        $appStackExchangeRedirect = $appStackExchangeRedirect ? $appStackExchangeRedirect->val : null;

        $appGitLabId = $this->providerSettings->where('key', 'appGitLabId')->first();
        $appGitLabId = $appGitLabId ? $appGitLabId->val : null;
        $appGitLabSecret = $this->providerSettings->where('key', 'appGitLabSecret')->first();
        $appGitLabSecret = $appGitLabSecret ? $appGitLabSecret->val : null;
        $appGitLabRedirect = $this->providerSettings->where('key', 'appGitLabRedirect')->first();
        $appGitLabRedirect = $appGitLabRedirect ? $appGitLabRedirect->val : null;

        $appRedditId = $this->providerSettings->where('key', 'appRedditId')->first();
        $appRedditId = $appRedditId ? $appRedditId->val : null;
        $appRedditSecret = $this->providerSettings->where('key', 'appRedditSecret')->first();
        $appRedditSecret = $appRedditSecret ? $appRedditSecret->val : null;
        $appRedditRedirect = $this->providerSettings->where('key', 'appRedditRedirect')->first();
        $appRedditRedirect = $appRedditRedirect ? $appRedditRedirect->val : null;
        $appRedditResponseType = $this->providerSettings->where('key', 'appRedditResponseType')->first();
        $appRedditResponseType = $appRedditResponseType ? $appRedditResponseType->val : null;
        $appRedditState = $this->providerSettings->where('key', 'appRedditState')->first();
        $appRedditState = $appRedditState ? $appRedditState->val : null;

        $appSnapchatId = $this->providerSettings->where('key', 'appSnapchatId')->first();
        $appSnapchatId = $appSnapchatId ? $appSnapchatId->val : null;
        $appSnapchatSecret = $this->providerSettings->where('key', 'appSnapchatSecret')->first();
        $appSnapchatSecret = $appSnapchatSecret ? $appSnapchatSecret->val : null;
        $appSnapchatRedirect = $this->providerSettings->where('key', 'appSnapchatRedirect')->first();
        $appSnapchatRedirect = $appSnapchatRedirect ? $appSnapchatRedirect->val : null;

        $appMeetupId = $this->providerSettings->where('key', 'appMeetupId')->first();
        $appMeetupId = $appMeetupId ? $appMeetupId->val : null;
        $appMeetupSecret = $this->providerSettings->where('key', 'appMeetupSecret')->first();
        $appMeetupSecret = $appMeetupSecret ? $appMeetupSecret->val : null;
        $appMeetupRedirect = $this->providerSettings->where('key', 'appMeetupRedirect')->first();
        $appMeetupRedirect = $appMeetupRedirect ? $appMeetupRedirect->val : null;

        $appAtlassianId = $this->providerSettings->where('key', 'appAtlassianId')->first();
        $appAtlassianId = $appAtlassianId ? $appAtlassianId->val : null;
        $appAtlassianSecret = $this->providerSettings->where('key', 'appAtlassianSecret')->first();
        $appAtlassianSecret = $appAtlassianSecret ? $appAtlassianSecret->val : null;
        $appAtlassianRedirect = $this->providerSettings->where('key', 'appAtlassianRedirect')->first();
        $appAtlassianRedirect = $appAtlassianRedirect ? $appAtlassianRedirect->val : null;

        // NEW_PROVIDER_PLUG :: Put New Provider HERE

        $providerConfigs = [
            'services.github' => [
                'client_id' => $appGitHubId,
                'client_secret' => $appGitHubSecret,
                'redirect' => $appGitHubRedirect,
            ],
            'services.facebook' => [
                'client_id' => $appFbId,
                'client_secret' => $appFbSecret,
                'redirect' => $appFbRedirect,
            ],
            'services.twitter' => [
                'client_id' => $appTwitterId,
                'client_secret' => $appTwitterSecret,
                'redirect' => $appTwitterRedirect,
            ],
            'services.google' => [
                'client_id' => $appGoogleId,
                'client_secret' => $appGoogleSecret,
                'redirect' => $appGoogleRedirect,
            ],
            'services.youtube' => [
                'client_id' => $appYouTubeId,
                'client_secret' => $appYouTubeSecret,
                'redirect' => $appYouTubeRedirect,
            ],
            'services.twitch' => [
                'client_id' => $appTwitchId,
                'client_secret' => $appTwitchSecret,
                'redirect' => $appTwitchRedirect,
            ],
            'services.instagram' => [
                'client_id' => $appInstagramId,
                'client_secret' => $appInstagramSecret,
                'redirect' => $appInstagramRedirect,
            ],
            'services.linkedin' => [
                'client_id' => $appLinkedInId,
                'client_secret' => $appLinkedInSecret,
                'redirect' => $appLinkedInRedirect,
            ],
            'services.apple' => [
                'client_id' => $appAppleId,
                'client_secret' => $appAppleSecret,
                'redirect' => $appAppleRedirect,
                'team_id' => $appAppleTeamId,
                'key_id' => $appAppleKeyId,
                'private_key' => $appApplePrivateKey,
            ],
            'services.microsoft' => [
                'client_id' => $appMicrosoftId,
                'client_secret' => $appMicrosoftSecret,
                'redirect' => $appMicrosoftRedirect,
            ],
            'services.tiktok' => [
                'client_id' => $appTikTokId,
                'client_secret' => $appTikTokSecret,
                'redirect' => $appTikTokRedirect,
            ],
            'services.zoho' => [
                'client_id' => $appZoHoId,
                'client_secret' => $appZoHoSecret,
                'redirect' => $appZoHoRedirect,
            ],
            'services.stackexchange' => [
                'client_id' => $appStackExchangeId,
                'client_secret' => $appStackExchangeSecret,
                'redirect' => $appStackExchangeRedirect,
                'key' => $appStackExchangeKey,
                'site' => $appStackExchangeSite,
            ],
            'services.gitlab' => [
                'client_id' => $appGitLabId,
                'client_secret' => $appGitLabSecret,
                'redirect' => $appGitLabRedirect,
            ],
            'services.reddit' => [
                'client_id' => $appRedditId,
                'client_secret' => $appRedditSecret,
                'response_type' => $appRedditResponseType,
                'state' => $appRedditState,
                'redirect' => $appRedditRedirect,
            ],
            'services.snapchat' => [
                'client_id' => $appSnapchatId,
                'client_secret' => $appSnapchatSecret,
                'redirect' => $appSnapchatRedirect,
            ],
            'services.meetup' => [
                'client_id' => $appMeetupId,
                'client_secret' => $appMeetupSecret,
                'redirect' => $appMeetupRedirect,
            ],
            'services.atlassian' => [
                'client_id' => $appAtlassianId,
                'client_secret' => $appAtlassianSecret,
                'redirect' => $appAtlassianRedirect,
            ],

            // NEW_PROVIDER_PLUG :: Put New Provider HERE
        ];

        $this->providerConfigs = $providerConfigs;
    }

    /**
     * Set provider configs on the systems config dynamically.
     */
    protected function setAppProvidersConfigs()
    {
        config($this->providerConfigs);
    }

    /**
     * This is the list of logins enabled for the front end of the app.
     *
     * @return array
     */
    protected function loginsList()
    {
        $this->setupProviders();
        $ps = $this->providerSettings;
        $enableFbLogin = $ps->firstWhere('key', 'enableFbLogin')->val;
        $enableTwitterLogin = $ps->firstWhere('key', 'enableTwitterLogin')->val;
        $enableGoogleLogin = $ps->firstWhere('key', 'enableGoogleLogin')->val;
        $enableGitHubLogin = $ps->firstWhere('key', 'enableGitHubLogin')->val;
        $enableTwitchLogin = $ps->firstWhere('key', 'enableTwitchLogin')->val;
        $enableInstagramLogin = $ps->firstWhere('key', 'enableInstagramLogin')->val;
        $enableYouTubeLogin = $ps->firstWhere('key', 'enableYouTubeLogin')->val;
        $enableLinkedInLogin = $ps->firstWhere('key', 'enableLinkedInLogin')->val;
        $enableAppleLogin = $ps->firstWhere('key', 'enableAppleLogin')->val;
        $enableMicrosoftLogin = $ps->firstWhere('key', 'enableMicrosoftLogin')->val;
        $enableTikTokLogin = $ps->firstWhere('key', 'enableTikTokLogin')->val;
        $enableZoHoLogin = $ps->firstWhere('key', 'enableZoHoLogin')->val;
        $enableStackExchangeLogin = $ps->firstWhere('key', 'enableStackExchangeLogin')->val;
        $enableGitLabLogin = $ps->firstWhere('key', 'enableGitLabLogin')->val;
        $enableRedditLogin = $ps->firstWhere('key', 'enableRedditLogin')->val;
        $enableSnapchatLogin = $ps->firstWhere('key', 'enableSnapchatLogin')->val;
        $enableMeetupLogin = $ps->firstWhere('key', 'enableMeetupLogin')->val;
        $enableAtlassianLogin = $ps->firstWhere('key', 'enableAtlassianLogin')->val;

        // NEW_PROVIDER_PLUG :: Put New Provider HERE

        return [
            'facebook' => $enableFbLogin,
            'twitter' => $enableTwitterLogin,
            'google' => $enableGoogleLogin,
            'instagram' => $enableInstagramLogin,
            'github' => $enableGitHubLogin,
            'youtube' => $enableYouTubeLogin,
            'linkedin' => $enableLinkedInLogin,
            'twitch' => $enableTwitchLogin,
            'apple' => $enableAppleLogin,
            'microsoft' => $enableMicrosoftLogin,
            'tiktok' => $enableTikTokLogin,
            'zoho' => $enableZoHoLogin,
            'stackexchange' => $enableStackExchangeLogin,
            'gitlab' => $enableGitLabLogin,
            'reddit' => $enableRedditLogin,
            'snapchat' => $enableSnapchatLogin,
            'meetup' => $enableMeetupLogin,
            'atlassian' => $enableAtlassianLogin,

            // NEW_PROVIDER_PLUG :: Put New Provider HERE
        ];
    }

    /**
     * Find or create a user.
     *
     * @param  SocialiteUser|object  $user
     * @param  string|null  $linkToken  Sanctum token of a signed in user connecting this provider
     * @return array{user: User|null, token: string|null, error?: string}
     */
    protected function findOrCreateUser(string $provider, $user, ?string $linkToken = null): array
    {
        if ($provider == 'twitter') {
            $email = $user->email ?? null;
            $providerId = $user->id ?? null;
        } else {
            $email = $user->getEmail();
            $providerId = $user->getId();
        }

        $oauthProvider = $this->findLinkedProvider($provider, $providerId);

        // 1. A signed in user connecting this provider from their account.
        $linkingUser = $this->findLinkingUser($linkToken);

        if ($linkingUser) {
            if ($oauthProvider && $oauthProvider->user_id != $linkingUser->id) {
                return [
                    'user' => null,
                    'token' => null,
                ];
            }

            if (! $oauthProvider) {
                $this->updateOrCreateUser($provider, $user, $linkingUser);
            }

            return $this->socialLogin($provider, $linkingUser);
        }

        // 2. A provider account already linked to a local user: log that user in.
        if ($oauthProvider && $oauthProvider->user) {
            return $this->socialLogin($provider, $oauthProvider->user);
        }

        // 3. No link yet, but a local user has the same email address. Link only when both the
        // local account and the provider verified it.
        $existingUser = $this->findUserByEmail($email);

        if ($existingUser) {
            if (! $existingUser->hasVerifiedEmail() || ! $this->providerVerifiedEmail($provider, $user)) {
                return [
                    'user' => null,
                    'token' => null,
                    'error' => __('auth.social_account_exists'),
                ];
            }

            return $this->socialLogin($provider, $this->updateOrCreateUser($provider, $user, $existingUser));
        }

        // 4. Brand new user.
        return $this->socialLogin($provider, $this->updateOrCreateUser($provider, $user));
    }

    /**
     * Find the stored link for this provider account. A missing provider id never matches.
     *
     * @param  mixed  $providerId
     */
    protected function findLinkedProvider(string $provider, $providerId): ?SocialiteProvider
    {
        if ($providerId === null || trim((string) $providerId) === '') {
            return null;
        }

        return SocialiteProvider::where('provider', $provider)
            ->where('provider_user_id', (string) $providerId)
            ->first();
    }

    /**
     * Find the signed in user who started this flow to connect a provider.
     */
    protected function findLinkingUser(?string $linkToken): ?User
    {
        if (! $linkToken) {
            return null;
        }

        $token = PersonalAccessToken::findToken($linkToken);

        return $token && $token->tokenable instanceof User ? $token->tokenable : null;
    }

    /**
     * Find a local user by email address. A missing email never matches anyone.
     *
     * @param  mixed  $email
     */
    protected function findUserByEmail($email): ?User
    {
        if (! is_string($email) || trim($email) === '') {
            return null;
        }

        return User::whereEmail($email)->first();
    }

    /**
     * Determine whether the provider positively confirmed that the email address is verified.
     *
     * Only providers that expose an explicit verification claim in their user payload are
     * trusted. Anything else is treated as unverified.
     *
     * @param  SocialiteUser|object  $user
     */
    protected function providerVerifiedEmail(string $provider, $user): bool
    {
        $raw = $provider == 'twitter' ? (array) $user : $user->getRaw();

        switch ($provider) {
            case 'google':
                // Google OpenID Connect userinfo: "email_verified" boolean claim.
                return $this->isTrueClaim($raw['email_verified'] ?? null);

            case 'github':
                // GitHub exposes no verified flag on the user object. Socialite only resolves the
                // email through /user/emails (primary and verified) when the "user:email" scope is
                // requested; without that scope the address is the user-settable public email.
                return ! empty($raw['email'])
                    && in_array('user:email', Socialite::driver($provider)->getScopes(), true);

            case 'twitter':
                // X (Twitter) OAuth 2 user object: "confirmed_email" is the confirmed address.
                // This app signs in through OAuth 1.0a verify_credentials, which has no such claim.
                return ! empty($raw['confirmed_email']);

            case 'linkedin':
                // LinkedIn OpenID Connect userinfo: "email_verified" boolean claim.
                return $this->isTrueClaim($raw['email_verified'] ?? null);

            case 'apple':
                // Sign in with Apple identity token: "email_verified" claim, a boolean or "true"/"false" string.
                return $this->isTrueClaim($raw['email_verified'] ?? null);

            default:
                // Facebook, Instagram, YouTube, Twitch, Microsoft, TikTok, Zoho, StackExchange, GitLab,
                // Reddit, Snapchat, Meetup and Atlassian expose no email verification claim.
                return false;
        }
    }

    /**
     * Normalize a provider boolean claim.
     *
     * @param  mixed  $value
     */
    protected function isTrueClaim($value): bool
    {
        return $value === true || $value === 1 || $value === '1' || $value === 'true';
    }

    /**
     * Issue an API token for a user signing in with a provider.
     *
     * @return array{user: User, token: string}
     */
    protected function socialLogin(string $provider, User $user): array
    {
        return [
            'user' => $user,
            'token' => $user->createToken($provider.'-token')->plainTextToken,
        ];
    }

    /**
     * Create a new user.
     *
     * @return App\Models\User
     */
    protected function updateOrCreateUser(string $provider, $sUser, $existingUser = null): User
    {
        $user = null;
        $pid = null;
        $email = null;
        $token = null;
        $refreshToken = null;
        $avatar = null;
        $emailValid = true;

        if ($existingUser) {
            $user = $existingUser;
            $email = $user->email;
            if ($provider == 'twitter') {
                $pid = $sUser->id;
                $avatar = $sUser->profile_image_url;
            } else {
                $pid = $sUser->getId();
            }
        } else {
            if ($provider == 'twitter') {
                $pid = $sUser->id;
                $email = $sUser->email;
                $name = $sUser->name;
                $avatar = $sUser->profile_image_url;
            } else {
                $pid = $sUser->getId();
                $name = $sUser->getName();
                $email = $sUser->getEmail();
                $avatar = $sUser->getAvatar();
                $token = $sUser->token;
                $refreshToken = $sUser->refreshToken;
            }

            if ($provider == 'reddit') {
                $name = $sUser->getNickname();
            }

            if (! $email) {
                $email = 'email_missing_'.str_random(20).'@'.str_random(20).'.example.org';
                $emailValid = false;
            }

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => bcrypt(str_random(50)),
            ]);

            $user->attachRole(config('roles.models.role')::whereName('User')->first());

            if ($user->email && $emailValid) {
                event(new Registered($user));
                // $user->email_verified_at = Carbon::now();
            }

            $user->save();
        }

        $this->addSocialiteProviderToUser($user, [
            'provider' => $provider,
            'provider_user_id' => $pid,
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'avatar' => $avatar,
        ]);

        return $user;
    }

    /**
     * Update or Create a Socialite Provider.
     *
     * @param  User  $user  [description]
     * @param  array  $data
     */
    protected function addSocialiteProviderToUser(User $user, $data): SocialiteProvider
    {
        $provider = SocialiteProvider::where('user_id', $user->id)
            ->where('provider', $data['provider'])
            ->where('provider_user_id', $data['provider_user_id'])->first();

        if ($provider) {
            return $provider->update([
                'access_token' => $data['access_token'],
                'refresh_token' => $data['refresh_token'],
                'avatar' => $data['avatar'],
            ]);
        }

        return $user->socialiteProviders()->create([
            'provider' => $data['provider'],
            'provider_user_id' => $data['provider_user_id'],
            'access_token' => $data['access_token'],
            'refresh_token' => $data['refresh_token'],
            'avatar' => $data['avatar'],
        ]);
    }

    /**
     * Generate a random string for temp Id.
     *
     * @param  int  $depth
     * @return string
     */
    protected function generateTempId($depth = 40)
    {
        return str_random($depth);
    }

    /**
     * Store a single use OAuth state server side and return its random key, which is sent to the
     * provider as the state. The Sanctum token of a signed in user connecting a provider stays here.
     */
    protected function storeOAuthState(string $provider, ?string $linkToken = null): string
    {
        $state = $this->generateTempId();

        Cache::put($this->oauthStateCacheKey($state), Crypt::encrypt([
            'provider' => $provider,
            'token' => $linkToken,
        ]), now()->addMinutes(10));

        return $state;
    }

    /**
     * Claim the OAuth state sent back to the callback. Each state is valid once, and only for the
     * provider it was issued for.
     *
     * @param  mixed  $state
     * @return array{provider: string, token: string|null}|null
     */
    protected function pullOAuthState(string $provider, $state): ?array
    {
        if (! is_string($state) || $state === '') {
            return null;
        }

        $stored = Cache::pull($this->oauthStateCacheKey($state));

        if (! is_string($stored)) {
            return null;
        }

        $stored = Crypt::decrypt($stored);

        if (($stored['provider'] ?? null) !== $provider) {
            return null;
        }

        return $stored;
    }

    /**
     * Cache key for an OAuth state.
     */
    protected function oauthStateCacheKey(string $state): string
    {
        return 'socialite-oauth-state:'.$state;
    }
}
