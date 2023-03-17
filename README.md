# Laravel Auth SPA

[![StyleCI](https://github.styleci.io/repos/537735029/shield?branch=released&style=flat)](https://github.styleci.io/repos/537735029?branch=master)
[![CodeQL](https://github.com/jeremykenedy/laravel-spa/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/jeremykenedy/laravel-spa/actions/workflows/codeql.yml)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=jeremykenedy_laravel-spa&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jeremykenedy_laravel-spa)
[![GitGuardian scan](https://github.com/jeremykenedy/laravel-spa/actions/workflows/gitguardian.yml/badge.svg)](https://github.com/jeremykenedy/laravel-spa/actions/workflows/gitguardian.yml)
[![Composer Install](https://github.com/jeremykenedy/laravel-spa/actions/workflows/php.yml/badge.svg)](https://github.com/jeremykenedy/laravel-spa/actions/workflows/php.yml)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jeremykenedy_laravel-spa&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jeremykenedy_laravel-spa)
[![MadeWithVueJs.com shield](https://madewithvuejs.com/storage/repo-shields/4106-shield.svg)](https://madewithvuejs.com/p/laravel-auth-spa/shield-link)
[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Djeremykenedy%26type%3Dpatrons&style=flat)](https://patreon.com/jeremykenedy)
[![Sponsor me on GitHub](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/jeremykenedy)
[![Vultr](https://img.shields.io/badge/Vultr-007BFC.svg?style=flat&logo=vultr)](https://www.vultr.com/?ref=9338425-8H)
[![License: MIT](https://img.shields.io/static/v1?label=License&message=MIT&color=green&style=flat)](https://opensource.org/licenses/MIT)

> This project costs me $22/month to be hosted on [Vultr](https://www.vultr.com/?ref=9338425-8H).<br>
> Please consider [supporting my work](https://patreon.com/jeremykenedy) if you use & find it useful. ❤️

### Table of contents
- [About](#about)
- [Features](#features)
- [Installation Instructions](#installation-instructions)
    - [Build the Front End Assets with Vite](#build-the-front-end-assets-with-vitejs)
    - [Optionally Build Cache](#optionally-build-cache)
- [Seeds](#seeds)
    - [Seeded Users](#seeded-users)
- [Socialite](#socialite)
    - [Get Socialite Login API Keys](#get-socialite-login-api-keys)
    - [Add More Socialite Logins](#add-more-socialite-logins)
- [Screenshots](#screenshots)
- [File Tree](#file-tree)
- [License](#license)

## About
A Laravel + Socialite + Vite + Vue 3 + TailwindCSS SPA Boilerplate.
Laravel with user authentication, registration with email verification, 
social media authentication, password recovery, user management, and roles/permissions 
management. Uses official [TailwindCSS](https://tailwindcss.com/). While the front end is 
part of this repository it is a completely separated Vue 3 front end compiled using ViteJS.

## App Features
##### Built on:
- [Laravel](https://laravel.com/docs/9.x)
- [Sanctum](https://laravel.com/docs/9.x/sanctum)
- [Socialite](https://laravel.com/docs/9.x/socialite)
- [Vite](https://laravel.com/docs/9.x/vite)
- [Vue 3](https://vuejs.org/)
- [TailwindCSS (w/ `@tailwindcss/forms` and `@tailwindcss/aspect-ratio`)](https://tailwindcss.com/)
- [Vue Router](https://v3.router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Headless UI](https://headlessui.com/)
- [Heroicons](https://heroicons.com/)
- [Font Awesome 6](https://fontawesome.com/search)
- [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/docs/en/index.html)

##### Features:
- Users Area
- Admin Area
- About Page
- Terms Page
- Users Managemenet
- User Impersonation
- User Data Download
- User Account Self Deletion.
- Manage Social Media Logins through GUI
- [Roles Management](https://github.com/jeremykenedy/laravel-roles)
- [Permissions Management](https://github.com/jeremykenedy/laravel-roles)
- [Google Analytics (optional)](https://matteo-gabriele.gitbook.io/vue-gtag/v/next/)
- [Social Authentication with Facebook, Twitter, Instagram, GitHub, TikTok, Google, YouTube, Microsoft, Twitch, and Apple](https://laravel.com/docs/9.x/socialite)
- [Optional Sentry.io Laravel Monitoring](https://docs.sentry.io/platforms/php/guides/laravel/)
- [Optional Sentry.io VueJs Monitoring](https://docs.sentry.io/platforms/javascript/guides/vue/)

## Installation Instructions
1. Run `git clone https://github.com/jeremykenedy/laravel-spa.git laravel-spa`
2. Create a MySQL database for the project
    * ```mysql -u root -p```, if using Vagrant: ```mysql -u homestead -psecret```
    * ```create database laravelSpa;```
    * ```\q```
3. From the projects root run `cp .env.example .env`
4. Configure your `.env` file (VERY IMPORTANT)
5. Run `composer install` from the projects root folder
6. From the projects root folder run `sudo chmod -R 755 ../laravel-spa`
7. From the projects root folder run `php artisan key:generate`
8. From the projects root folder run `php artisan migrate`
9. From the projects root folder run `composer dump-autoload`
10. From the projects root folder run `php artisan db:seed`
11. Compile the front end assets with [npm steps](#using-npm) or [yarn steps](#using-yarn).

#### Build the Front End Assets with ViteJs
##### Using NPM:
1. From the projects root folder run `npm install`
2. From the projects root folder run `npm run dev` or `npm run build`
  * You can lint assets with `npm run lint`
  * You can clean the syntax with `npm run clean`

##### Using Yarn:
1. From the projects root folder run `yarn install`
2. From the projects root folder run `yarn run dev` or `yarn run build`
  * You can lint assets with `yarn run lint`
  * You can clean the syntax with `yarn run clean`

#### Optionally Build Cache
1. From the projects root folder run `php artisan config:cache`

###### And thats it with the caveat of setting up and configuring your development environment.

## Seeds

##### Seeded Users

|Email|Password|
|:------------|:------------|
|superadmin@superadmin.com|password|
|admin@admin.com|password|
|user@user.com|password|

## Socialite

#### Get Socialite Login API Keys:
* [Facebook API](https://developers.facebook.com/) (Will work with local dev callback)
* [Twitter API](https://apps.twitter.com/)
* [Instagram API](https://instagram.com/developer/register/)
* [GitHub API](https://github.com/settings/applications/new) (Will work with local dev callback)
* [YouTube API](https://developers.google.com/youtube/v3/getting-started)
* [Google API](https://console.developers.google.com/)
* [LinkedIn API](https://www.linkedin.com/developers/apps/) (Will work with local dev callback)
* [Twitch API](https://dev.twitch.tv/docs/authentication/) (Will work with local dev callback)
* [Microsoft API]()
* [TikTok API](https://developers.tiktok.com/)
* [Apple API](https://developer.okta.com/blog/2019/06/04/what-the-heck-is-sign-in-with-apple)
* [ZoHo API](https://api-console.zoho.com/) (Will work with local dev callback)
* [StackExchange API](https://stackapps.com/apps/oauth/register/) (Will work with local dev callback)
* [GitLab API](https://gitlab.com/oauth/applications) (Will work with local dev callback)
* [Reddit API](https://www.reddit.com/prefs/apps) [Register](https://docs.google.com/a/reddit.com/forms/d/e/1FAIpQLSezNdDNK1-P8mspSbmtC2r86Ee9ZRbC66u929cG2GX0T9UMyw/viewform) (Will work with local dev callback)
* [Snapchat API](https://devportal.snap.com/manage/)
* [Meetup API](https://www.meetup.com/api/oauth/list/)
* [Atlassian](https://developer.atlassian.com/console/myapps/)

#### Add More Socialite Logins
* See full list of providers: [https://socialiteproviders.github.io](https://socialiteproviders.com/about/)

## Screenshots

<p float="left">
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/login-sm.png" title="Login Social Media" alt="Login Social Media" width="48%"/>
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/login-sm-tiktok.png" title="Login Social Media TikTok" alt="Login Social Media TikTok" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/register-sm-instagram.png" title="Register Social Media Instagram" alt="Register Social Media Instagram" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/register-sm.png" title="Register Social Media" alt="Register Social Media" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/dashboard-success-login-sm.png" title="Social User Dashboard" alt="Social User Dashboard" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/admin-dashboard.png" title="Admin Dashboard Dark Mode" alt="Admin Dashboard Dark Mode" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/admin-users.png" title="Admin Users Table" alt="Admin Users Table" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/admin-roles.png" title="Admin Roles Table" alt="Admin Roles Table" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/admin-permissions.png" title="Admin Permissions Table" alt="Admin Permissions Table" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3/admin-app-settings.png" title="Admin App Settings Dark Mode" alt="Admin App Settings Dark Mode" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/home.png" title="Home" alt="Home" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/about.png" title="About" alt="About" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/login.png" title="Login" alt="Login" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/register.png" title="Register" alt="Register" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/dashboard.png" title="Dashboard" alt="Dashboard" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/profile1.png" title="Settings - Profile" alt="Settings - Profile" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/profile2.png" title="Settings - Password" alt="Settings - Password" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/profile3.png" title="Profile Dark" alt="Profile Dark" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3.1/settings-account-auth.png" title="Account SM Settings" alt="Account SM Settings" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3.1/settings-account-auth-revoke.png" title="Revoke Account SM Provider" alt="Revoke Account SM Provider" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3.1/settings-account-delete.png" title="Delete Account" alt="Delete Account" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3.1/settings-account-delete-confirm.png" title="Confirm Delete Account" alt="Confirm Delete Account" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3.1/account-deleted.png" title="Account Deleted" alt="Account Deleted" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/v3.1/terms.png" title="Terms Template" alt="Terms Template" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/forgot.png" title="Forgot Password" alt="Forgot Password" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/reset.png" title="Reset Password" alt="Reset Password" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/mobile-menu.png" title="Mobile Menu" alt="Mobile Menu" width="48%" />
    <img src="https://laravel-spa.s3.us-west-2.amazonaws.com/mobile-login.png" title="Mobile Login" alt="Mobile Login" width="48%" />
</p>

## File Tree
```
LaravelSpa
├── .browserslistrc
├── .editorconfig
├── .env.example
├── .env.travis
├── .eslintrc.js
├── .gitattributes
├── .github
│   ├── FUNDING.yml
│   ├── dependabot.yml
│   ├── labeler.yml
│   └── workflows
│       ├── changelog.yml
│       ├── codeql.yml
│       ├── create-release.yml
│       ├── dependency-review.yml
│       ├── deploy.yml
│       ├── gitguardian.yml
│       ├── greetings.yml
│       ├── labeler.yml
│       ├── laravel.yml
│       ├── manual.yml
│       ├── node.js.yml
│       ├── php.yml
│       ├── release.yml
│       ├── sentry.yml
│       └── stale.yml
├── .gitignore
├── .npmrc
├── .prettierignore
├── .scripts
│   └── deploy.sh
├── .styleci.yml
├── .travis.yml
├── LICENSE
├── README.md
├── SECURITY.md
├── app
│   ├── Console
│   │   └── Kernel.php
│   ├── Exceptions
│   │   ├── Handler.php
│   │   └── SocialProviderDeniedException.php
│   ├── Http
│   │   ├── Controllers
│   │   │   ├── AppSettingsController.php
│   │   │   ├── AppleSocialController.php
│   │   │   ├── Auth
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── ForgotPasswordController.php
│   │   │   │   ├── PasswordController.php
│   │   │   │   ├── RegisterController.php
│   │   │   │   ├── ResetPasswordController.php
│   │   │   │   ├── SocialiteController.php
│   │   │   │   └── VerificationController.php
│   │   │   ├── Controller.php
│   │   │   ├── DashboardController.php
│   │   │   ├── ImpersonateController.php
│   │   │   ├── PermissionsController.php
│   │   │   ├── ProfileController.php
│   │   │   ├── RolesController.php
│   │   │   ├── ServerInfoController.php
│   │   │   ├── UserController.php
│   │   │   └── UsersController.php
│   │   ├── Kernel.php
│   │   ├── Middleware
│   │   │   ├── AddContentSecurityPolicyHeaders.php
│   │   │   ├── Authenticate.php
│   │   │   ├── EncryptCookies.php
│   │   │   ├── PreventRequestsDuringMaintenance.php
│   │   │   ├── RedirectIfAuthenticated.php
│   │   │   ├── TrimStrings.php
│   │   │   ├── TrustHosts.php
│   │   │   ├── TrustProxies.php
│   │   │   └── VerifyCsrfToken.php
│   │   ├── Requests
│   │   │   ├── AppSettings
│   │   │   ├── Permissions
│   │   │   │   ├── CreatePermissionRequest.php
│   │   │   │   ├── GetPermissionsRequest.php
│   │   │   │   └── UpdatePermissionRequest.php
│   │   │   ├── Roles
│   │   │   │   ├── CreateRoleRequest.php
│   │   │   │   └── UpdateRoleRequest.php
│   │   │   └── Users
│   │   │       ├── CreateUserRequest.php
│   │   │       ├── GetUserRolesRequest.php
│   │   │       ├── ImpersonateUserRequest.php
│   │   │       └── UpdateUserRequest.php
│   │   └── Resources
│   │       ├── Permissions
│   │       │   ├── PermissionResource.php
│   │       │   └── PermissionsCollection.php
│   │       └── Users
│   │           ├── RoleResource.php
│   │           └── RolesCollection.php
│   ├── Jobs
│   │   └── PersonalDataExportJob.php
│   ├── Mail
│   │   └── ExceptionOccured.php
│   ├── Models
│   │   ├── Impersonation.php
│   │   ├── Permission.php
│   │   ├── Role.php
│   │   ├── Setting.php
│   │   ├── SocialiteProvider.php
│   │   └── User.php
│   ├── Notifications
│   │   ├── PersonalDataExportedNotification.php
│   │   ├── ResetPasswordNotification.php
│   │   └── VerifyEmailNotification.php
│   ├── Providers
│   │   ├── AppServiceProvider.php
│   │   ├── AuthServiceProvider.php
│   │   ├── BroadcastServiceProvider.php
│   │   ├── EventServiceProvider.php
│   │   ├── RouteServiceProvider.php
│   │   └── ViewComposerServiceProvider.php
│   ├── Services
│   │   └── AppleToken.php
│   ├── Traits
│   │   ├── AppSettingsTrait.php
│   │   └── SocialiteProvidersTrait.php
│   └── View
│       └── Composers
│           ├── GaComposer.php
│           └── GaEnabledComposer.php
├── artisan
├── bootstrap
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── app.php
│   ├── apple-touch-icon.png
│   ├── cache
│   │   ├── .gitignore
│   │   ├── packages.php
│   │   ├── routes-v7.php
│   │   └── services.php
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   └── ssr
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       ├── app2.mjs
│       ├── apple-touch-icon.png
│       ├── assets
│       │   ├── About-8055ba51.mjs
│       │   ├── Account-db07883a.mjs
│       │   ├── Admin-1aef526f.mjs
│       │   ├── AdminLayout-b06d3e9f.mjs
│       │   ├── AppSettings-493dc486.mjs
│       │   ├── Dashboard-00d0a96f.mjs
│       │   ├── Errors-cfd7b346.mjs
│       │   ├── ForgotPassword-ca93934f.mjs
│       │   ├── Home-092f52e0.mjs
│       │   ├── Login-3d895534.mjs
│       │   ├── NotFound-52f67599.mjs
│       │   ├── Password-0f549b05.mjs
│       │   ├── Permissions-d779932d.mjs
│       │   ├── PhpInfo-c54b8303.mjs
│       │   ├── Profile-8dc4ce3e.mjs
│       │   ├── Register-c8d7fa41.mjs
│       │   ├── ResetPassword-4e7ca3b7.mjs
│       │   ├── Roles-53fcb449.mjs
│       │   ├── RolesBadges-5ee6b7bc.mjs
│       │   ├── Settings-a3568c63.mjs
│       │   ├── SocialiteLogins-6af0e372.mjs
│       │   ├── Success-4b3d058c.mjs
│       │   ├── Terms-3b1605fc.mjs
│       │   ├── Users-fcead5b0.mjs
│       │   ├── VerifyEmail-3b245fb1.mjs
│       │   ├── default.css_vue_type_style_index_0_src_true_lang-6d22712f.mjs
│       │   ├── workbox-window.prod.es5-77e1b1e1.mjs
│       │   └── zoho-monocrome-black-b48ed5c0.mjs
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── favicon.ico
│       ├── js-bundle-stats.html
│       ├── manifest.webmanifest
│       └── pluginWebUpdateNotice
│           ├── webUpdateNoticeInjectScript.global.js
│           ├── webUpdateNoticeInjectStyle.css
│           └── web_version_by_plugin.json
├── composer.json
├── composer.lock
├── config
│   ├── app.php
│   ├── auth.php
│   ├── broadcasting.php
│   ├── cache.php
│   ├── cors.php
│   ├── database.php
│   ├── debugbar.php
│   ├── exceptions.php
│   ├── filesystems.php
│   ├── hashing.php
│   ├── laravel-https.php
│   ├── laravel-logger.php
│   ├── laravel-page-speed.php
│   ├── laravelpwa.php
│   ├── logging.php
│   ├── mail.php
│   ├── personal-data-export.php
│   ├── queue.php
│   ├── roles.php
│   ├── sanctum.php
│   ├── sentry.php
│   ├── services.php
│   ├── session.php
│   ├── settings.php
│   ├── users.php
│   └── view.php
├── database
│   ├── .gitignore
│   ├── factories
│   │   └── UserFactory.php
│   ├── migrations
│   │   ├── 2014_10_00_000000_create_settings_table.php
│   │   ├── 2014_10_00_000001_add_group_column_on_settings_table.php
│   │   ├── 2014_10_12_000000_create_users_table.php
│   │   ├── 2014_10_12_100000_create_password_resets_table.php
│   │   ├── 2016_01_15_105324_create_roles_table.php
│   │   ├── 2016_01_15_114412_create_role_user_table.php
│   │   ├── 2016_01_26_115212_create_permissions_table.php
│   │   ├── 2016_01_26_115523_create_permission_role_table.php
│   │   ├── 2016_02_09_132439_create_permission_user_table.php
│   │   ├── 2019_08_19_000000_create_failed_jobs_table.php
│   │   ├── 2019_12_14_000001_create_personal_access_tokens_table.php
│   │   ├── 2021_04_26_093603_create_jobs_table.php
│   │   ├── 2022_09_05_192055_update_users_table.php
│   │   ├── 2022_11_02_051027_update_settings_table.php
│   │   ├── 2022_11_28_073632_create_socialite_providers_table.php
│   │   └── 2022_12_06_061947_create_impersonations_table.php
│   └── seeders
│       ├── AppSettingsSeeder.php
│       ├── ConnectRelationshipsSeeder.php
│       ├── DatabaseSeeder.php
│       ├── PermissionsTableSeeder.php
│       ├── RolesTableSeeder.php
│       └── UsersTableSeeder.php
├── env.d.ts
├── package-lock.json
├── package.json
├── phpunit.xml
├── postcss.config.js
├── prettier.config.js
├── prettierrc.json
├── public
│   ├── .htaccess
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── css
│   │   └── app.css
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── images
│   │   └── icons
│   │       ├── icon-128x128.png
│   │       ├── icon-144x144.png
│   │       ├── icon-152x152.png
│   │       ├── icon-192x192.png
│   │       ├── icon-384x384.png
│   │       ├── icon-512x512.png
│   │       ├── icon-72x72.png
│   │       ├── icon-96x96.png
│   │       ├── splash-1125x2436.png
│   │       ├── splash-1242x2208.png
│   │       ├── splash-1242x2688.png
│   │       ├── splash-1536x2048.png
│   │       ├── splash-1668x2224.png
│   │       ├── splash-1668x2388.png
│   │       ├── splash-2048x2732.png
│   │       ├── splash-640x1136.png
│   │       ├── splash-750x1334.png
│   │       └── splash-828x1792.png
│   ├── index.php
│   ├── js
│   │   ├── app.js
│   │   ├── resources_js_Views_ForgotPassword_vue.js
│   │   ├── resources_js_Views_Home_vue.js
│   │   ├── resources_js_Views_Login_vue.js
│   │   ├── resources_js_Views_Password_vue.js
│   │   ├── resources_js_Views_Profile_vue.js
│   │   ├── resources_js_Views_Register_vue.js
│   │   ├── resources_js_Views_ResetPassword_vue.js
│   │   ├── resources_js_Views_Settings_vue.js
│   │   ├── resources_js_Views_VerifyEmail_vue.js
│   │   ├── resources_js_Views_Welcome_vue.js
│   │   └── s-code.min.js
│   ├── mix-manifest.json
│   ├── robots.txt
│   ├── serviceworker.js
│   ├── sw.ts
│   └── web.config
├── resources
│   ├── css
│   │   ├── app.css
│   │   └── normalize.css
│   ├── img
│   │   ├── 404.png
│   │   ├── favicon
│   │   │   ├── android-chrome-192x192.png
│   │   │   ├── android-chrome-512x512.png
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── favicon-16x16.png
│   │   │   ├── favicon-32x32.png
│   │   │   └── favicon.ico
│   │   ├── plugs.png
│   │   └── vendor-logos
│   │       ├── vultr-1.webp
│   │       ├── vultr-2.png
│   │       ├── zoho-monocrome-black.png
│   │       └── zoho-monocrome-white.png
│   ├── js
│   │   ├── app.js
│   │   ├── bootstrap.js
│   │   ├── components
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppNav.vue
│   │   │   ├── BmcButtons.vue
│   │   │   ├── CircleSvg.vue
│   │   │   ├── Errors.vue
│   │   │   ├── GHButton.vue
│   │   │   ├── GHButtons.vue
│   │   │   ├── OctoCat.vue
│   │   │   ├── Pagination.vue
│   │   │   ├── PatreonButton.vue
│   │   │   ├── PerPage.vue
│   │   │   ├── ReloadPrompt.vue
│   │   │   ├── Success.vue
│   │   │   ├── VerifyNotice.vue
│   │   │   ├── VultrReferral.vue
│   │   │   ├── account
│   │   │   │   ├── AccountAdministration.vue
│   │   │   │   ├── AccountAuthentication.vue
│   │   │   │   ├── AccountData.vue
│   │   │   │   └── AccountPrivacy.vue
│   │   │   ├── admin
│   │   │   │   ├── AdminNavBar.vue
│   │   │   │   ├── AdminSidebar.vue
│   │   │   │   ├── RolesTable.vue
│   │   │   │   ├── RolesTableRow.vue
│   │   │   │   ├── UsersTable.vue
│   │   │   │   └── UsersTableRow.vue
│   │   │   ├── auth
│   │   │   │   └── SocialiteLogins.vue
│   │   │   ├── common
│   │   │   │   ├── AppButton.vue
│   │   │   │   ├── AppDeleteModal.vue
│   │   │   │   ├── AppModal.vue
│   │   │   │   ├── AppSwitch.vue
│   │   │   │   ├── AppTable.vue
│   │   │   │   └── AppToast.vue
│   │   │   ├── form
│   │   │   │   ├── AppSettingTextInput.vue
│   │   │   │   ├── AppSettingTextarea.vue
│   │   │   │   └── AppSettingToggle.vue
│   │   │   ├── loaders
│   │   │   │   └── AnimatedTableLoader.vue
│   │   │   ├── roles
│   │   │   │   ├── PermissionFormModal.vue
│   │   │   │   ├── RoleFormModal.vue
│   │   │   │   └── RolesBadges.vue
│   │   │   └── users
│   │   │       ├── UserDownloadData.vue
│   │   │       ├── UserForm.vue
│   │   │       └── UserFormModal.vue
│   │   ├── layouts
│   │   │   └── AdminLayout.vue
│   │   ├── middleware
│   │   │   ├── auth.js
│   │   │   ├── guest.js
│   │   │   ├── middlewarePipeline.js
│   │   │   ├── roleAdmin.js
│   │   │   ├── roleSuperAdmin.js
│   │   │   └── roleUser.js
│   │   ├── router
│   │   │   ├── index.js
│   │   │   └── routes.js
│   │   ├── services
│   │   │   ├── analytics.js
│   │   │   ├── asteroids.js
│   │   │   ├── common.js
│   │   │   ├── excanvas.js
│   │   │   ├── s-code.js
│   │   │   ├── s-code.min.js
│   │   │   └── users.js
│   │   ├── store
│   │   │   ├── index.js
│   │   │   ├── modules
│   │   │   │   ├── auth.js
│   │   │   │   ├── sidebar.js
│   │   │   │   └── toast.js
│   │   │   └── mutation-types.js
│   │   └── views
│   │       ├── App.vue
│   │       ├── Blank.vue
│   │       ├── admin
│   │       │   ├── Admin.vue
│   │       │   ├── AppSettings.vue
│   │       │   ├── Permissions.vue
│   │       │   ├── PhpInfo.vue
│   │       │   ├── Roles.vue
│   │       │   └── Users.vue
│   │       └── pages
│   │           ├── About.vue
│   │           ├── Dashboard.vue
│   │           ├── ForgotPassword.vue
│   │           ├── Home.vue
│   │           ├── Login.vue
│   │           ├── NotFound.vue
│   │           ├── Register.vue
│   │           ├── ResetPassword.vue
│   │           ├── Terms.vue
│   │           ├── VerifyEmail.vue
│   │           ├── auth
│   │           └── settings
│   │               ├── Account.vue
│   │               ├── Password.vue
│   │               ├── Profile.vue
│   │               └── Settings.vue
│   ├── lang
│   │   └── en
│   │       ├── auth.php
│   │       ├── pagination.php
│   │       ├── passwords.php
│   │       ├── personal-data-exports.php
│   │       └── validation.php
│   └── views
│       ├── app.blade.php
│       ├── emails
│       │   └── exception.blade.php
│       ├── errors
│       │   ├── 401.blade.php
│       │   ├── 403.blade.php
│       │   ├── 500.blade.php
│       │   ├── 503.blade.php
│       │   └── layout.blade.php
│       ├── socialite
│       │   ├── callback.blade.php
│       │   └── denied.blade.php
│       └── welcome.blade.php
├── routes
│   ├── api.php
│   ├── channels.php
│   ├── console.php
│   └── web.php
├── server.php
├── tailwind.config.js
├── tailwindcss-perspective.js
├── tsconfig.json
├── tsconfig.vite-config.json
└── vite.config.ts

76 directories, 380 files

```

* Tree command can be installed using brew: `brew install tree`
* File tree generated using command `tree -a -I '.git|node_modules|vendor|build|storage|tests|.DS_Store|.env'`

## License
Laravel-Spa is licensed under the [MIT license](https://opensource.org/licenses/MIT). Enjoy!
