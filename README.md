# Laravel Auth SPA

[![StyleCI](https://github.styleci.io/repos/537735029/shield?branch=master)](https://github.styleci.io/repos/537735029?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jeremykenedy_laravel-spa&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jeremykenedy_laravel-spa)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

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
A Laravel 9 + Socialite + Vite + Vue 3 + Tailwind CSS SPA Boilerplate.
Laravel 9 with user authentication, registration with email verification, 
social media authentication, password recovery, user management, and roles/permissions 
managemenet. Uses official [TailwindCSS](https://tailwindcss.com/). While the front end is 
part of this repository it is a completely separated Vue 3 front end compiled using ViteJS.

## App Features
##### Built on:
- [Laravel 9](https://laravel.com/docs/9.x)
- [Sanctum](https://laravel.com/docs/9.x/sanctum)
- [Socialite](https://laravel.com/docs/9.x/socialite)
- [Vite](https://laravel.com/docs/9.x/vite)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS (w/ `@tailwindcss/forms` and `@tailwindcss/aspect-ratio`)](https://tailwindcss.com/)
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
- Users Managemenet
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
4. Configure your `.env` file (IMPORTANT)
5. Run `composer install` from the projects root folder
6. From the projects root folder run `sudo chmod -R 755 ../laravel-spa`
7. From the projects root folder run `php artisan key:generate`
8. From the projects root folder run `php artisan migrate`
9. From the projects root folder run `composer dump-autoload`
10. From the projects root folder run `php artisan db:seed`
11. Compile the front end assets with [npm steps](#using-npm) or [yarn steps](#using-yarn).

#### Build the Front End Assets with ViteJs
##### IMPORTANT NOTE: If you are running this project in development mode you will need to update the following lines in [vite.config.ts](https://github.com/jeremykenedy/laravel-spa/blob/master/vite.config.ts):
* [Line 60](https://github.com/jeremykenedy/laravel-spa/blob/master/vite.config.ts#L60) 
* [Line 63](https://github.com/jeremykenedy/laravel-spa/blob/master/vite.config.ts#L63)
* [Line 66](https://github.com/jeremykenedy/laravel-spa/blob/master/vite.config.ts#L66)

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
* [Facebook API](https://developers.facebook.com/)
* [Twitter API](https://apps.twitter.com/)
* [Google API](https://console.developers.google.com/)
* [YouTube API](https://developers.google.com/youtube/v3/getting-started)
* [GitHub API](https://github.com/settings/applications/new)
* [Twitch API](https://dev.twitch.tv/docs/authentication/)
* [Instagram API](https://instagram.com/developer/register/)
* [TikTok API](https://developers.tiktok.com/)
* [Apple API](https://socialiteproviders.com/Apple/#installation-basic-usage)

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
│   └── workflows
│       ├── changelog.yml
│       ├── codeql.yml
│       ├── dependency-review.yml
│       ├── greetings.yml
│       ├── laravel.yml
│       ├── node.js.yml
│       ├── php.yml
│       ├── release.yml
│       └── stale.yml
├── .gitignore
├── .npmrc
├── .prettierignore
├── .styleci.yml
├── .travis.yml
├── LICENSE
├── README.md
├── app
│   ├── Console
│   │   └── Kernel.php
│   ├── Exceptions
│   │   ├── Handler.php
│   │   └── SocialProviderDeniedException.php
│   ├── Http
│   │   ├── Controllers
│   │   │   ├── AppSettingsController.php
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
│   │   │   ├── PermissionsController.php
│   │   │   ├── ProfileController.php
│   │   │   ├── RolesController.php
│   │   │   ├── UserController.php
│   │   │   └── UsersController.php
│   │   ├── Kernel.php
│   │   ├── Middleware
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
│   │   │       └── UpdateUserRequest.php
│   │   └── Resources
│   │       ├── Permissions
│   │       │   ├── PermissionResource.php
│   │       │   └── PermissionsCollection.php
│   │       └── Users
│   │           ├── RoleResource.php
│   │           └── RolesCollection.php
│   ├── Mail
│   │   └── ExceptionOccured.php
│   ├── Models
│   │   ├── Permission.php
│   │   ├── Role.php
│   │   ├── Setting.php
│   │   ├── SocialiteProvider.php
│   │   └── User.php
│   ├── Notifications
│   │   ├── ResetPasswordNotification.php
│   │   └── VerifyEmailNotification.php
│   ├── Providers
│   │   ├── AppServiceProvider.php
│   │   ├── AuthServiceProvider.php
│   │   ├── BroadcastServiceProvider.php
│   │   ├── EventServiceProvider.php
│   │   ├── RouteServiceProvider.php
│   │   └── ViewComposerServiceProvider.php
│   └── View
│       └── Composers
│           ├── GaComposer.php
│           └── GaEnabledComposer.php
├── artisan
├── bootstrap
│   ├── app.php
│   └── cache
│       ├── .gitignore
│       ├── packages.php
│       └── services.php
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
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── roles.php
│   ├── sanctum.php
│   ├── services.php
│   ├── session.php
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
│   │   └── 2022_11_28_073632_create_socialite_providers_table.php
│   └── seeders
│       ├── AppSettingsSeeder.php
│       ├── ConnectRelationshipsSeeder.php
│       ├── DatabaseSeeder.php
│       ├── PermissionsTableSeeder.php
│       ├── RolesTableSeeder.php
│       └── UsersTableSeeder.php
├── env.d.ts
├── license.svg
├── package.json
├── phpunit.xml
├── postcss.config.js
├── prettier.config.js
├── prettierrc.json
├── public
│   ├── .htaccess
│   ├── build
│   │   ├── assets
│   │   │   ├── 404.508db666.png
│   │   │   ├── app-legacy.bd153b9f.js
│   │   │   ├── app-legacy.c0ed8668.js
│   │   │   ├── app.092af6b3.css
│   │   │   ├── app.32dd3c38.js
│   │   │   ├── app.a70dc797.css
│   │   │   ├── fa-brands-400.b1d1c1b0.ttf
│   │   │   ├── fa-brands-400.c61287c2.woff2
│   │   │   ├── fa-regular-400.5da313b0.woff2
│   │   │   ├── fa-regular-400.d7b19fe2.ttf
│   │   │   ├── fa-solid-900.8f06540f.woff2
│   │   │   ├── fa-solid-900.e4f6a7e9.ttf
│   │   │   ├── fa-v4compatibility.2ddb3b41.ttf
│   │   │   ├── fa-v4compatibility.f46715c9.woff2
│   │   │   ├── plugs.12bd3189.png
│   │   │   ├── polyfills-legacy.06fde1ca.js
│   │   │   ├── vendor-legacy.cb3b591e.js
│   │   │   └── vendor.fc255866.js
│   │   ├── manifest.json
│   │   ├── webUpdateNoticeInjectScript.js
│   │   ├── webUpdateNoticeInjectStyle.css
│   │   └── web_version_by_plugin.json
│   ├── css
│   │   └── app.css
│   ├── favicon.ico
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
│   │   └── resources_js_Views_Welcome_vue.js
│   ├── mix-manifest.json
│   ├── robots.txt
│   └── web.config
├── resources
│   ├── css
│   │   ├── app.css
│   │   └── normalize.css
│   ├── img
│   │   ├── 404.png
│   │   └── plugs.png
│   ├── js
│   │   ├── app.js
│   │   ├── bootstrap.js
│   │   ├── components
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppNav.vue
│   │   │   ├── CircleSvg.vue
│   │   │   ├── Errors.vue
│   │   │   ├── Pagination.vue
│   │   │   ├── PerPage.vue
│   │   │   ├── Success.vue
│   │   │   ├── VerifyNotice.vue
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
│   │   │   │   ├── AppModal.vue
│   │   │   │   ├── AppSwitch.vue
│   │   │   │   ├── AppTable.vue
│   │   │   │   └── AppToast.vue
│   │   │   ├── roles
│   │   │   │   ├── PermissionFormModal.vue
│   │   │   │   ├── RoleFormModal.vue
│   │   │   │   └── RolesBadges.vue
│   │   │   └── users
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
│   │   │   ├── common.js
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
│   │       │   ├── Roles.vue
│   │       │   └── Users.vue
│   │       └── pages
│   │           ├── About.vue
│   │           ├── Dashboard.vue
│   │           ├── ForgotPassword.vue
│   │           ├── Home.vue
│   │           ├── Login.vue
│   │           ├── NotFound.vue
│   │           ├── Password.vue
│   │           ├── Profile.vue
│   │           ├── Register.vue
│   │           ├── ResetPassword.vue
│   │           ├── Settings.vue
│   │           └── VerifyEmail.vue
│   ├── lang
│   │   └── en
│   │       ├── auth.php
│   │       ├── pagination.php
│   │       ├── passwords.php
│   │       └── validation.php
│   └── views
│       ├── app.blade.php
│       ├── emails
│       │   └── exception.blade.php
│       ├── errors
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

61 directories, 260 files
```

* Tree command can be installed using brew: `brew install tree`
* File tree generated using command `tree -a -I '.git|node_modules|vendor|storage|tests|.DS_Store|.env'`

## License
Laravel-Spa is licensed under the [MIT license](https://opensource.org/licenses/MIT). Enjoy!
