# Laravel SPA

[![StyleCI](https://github.styleci.io/repos/537735029/shield?branch=master)](https://github.styleci.io/repos/537735029?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

#### Table of contents
- [About](#about)
- [Features](#features)
- [Installation Instructions](#installation-instructions)
    - [Build the Front End Assets with Vite](#build-the-front-end-assets-with-vitejs)
    - [Optionally Build Cache](#optionally-build-cache)
- [Seeds](#seeds)
    - [Seeded Users](#seeded-users)
- [Screenshots](#screenshots)
- [File Tree](#file-tree)
- [License](#license)

### About
A Laravel 9 + Vite + Vue 3 + Tailwind CSS SPA Boilerplate

### Features
This starter template that is built on:
- Laravel 9
- Sanctum
- Vite
- Vue 3
- Tailwind CSS (w/ `@tailwindcss/forms` and `@tailwindcss/aspect-ratio`)
- Vue Router
- Vuex
- Axios
- Headless UI
- Heroicons
- Font Awesome 6
- ESLint with Prettier
- Admin Area
- Roles Management
- Permissions Management
- Users Managemenet

### Installation Instructions
1. Run `git clone https://github.com/jeremykenedy/laravel-spa.git laravel-spa`
2. Create a MySQL database for the project
    * ```mysql -u root -p```, if using Vagrant: ```mysql -u homestead -psecret```
    * ```create database laravelSpa;```
    * ```\q```
3. From the projects root run `cp .env.example .env`
4. Configure your `.env` file
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

### Seeds
##### Seeded Users

|Email|Password|
|:------------|:------------|
|user@user.com|password|

### Screenshots
![Home](https://laravel-spa.s3.us-west-2.amazonaws.com/home.png)
![About](https://laravel-spa.s3.us-west-2.amazonaws.com/about.png)
![Login](https://laravel-spa.s3.us-west-2.amazonaws.com/login.png)
![Register](https://laravel-spa.s3.us-west-2.amazonaws.com/register.png)
![Dashboard](https://laravel-spa.s3.us-west-2.amazonaws.com/dashboard.png)
![Settings - Profile](https://laravel-spa.s3.us-west-2.amazonaws.com/profile1.png)
![Settings - Password](https://laravel-spa.s3.us-west-2.amazonaws.com/profile2.png)
![Profile Dark](https://laravel-spa.s3.us-west-2.amazonaws.com/profile3.png)
![Forgot Password](https://laravel-spa.s3.us-west-2.amazonaws.com/forgot.png)
![Reset Password](https://laravel-spa.s3.us-west-2.amazonaws.com/reset.png)
![Mobile Menu](https://laravel-spa.s3.us-west-2.amazonaws.com/mobile-menu.png)
![Mobile Login](https://laravel-spa.s3.us-west-2.amazonaws.com/mobile-login.png)

### File Tree
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
│       ├── codeql.yml
│       ├── dependency-review.yml
│       ├── greetings.yml
│       ├── laravel.yml
│       ├── node.js.yml
│       ├── php.yml
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
│   │   └── Handler.php
│   ├── Http
│   │   ├── Controllers
│   │   │   ├── AppSettingsController.php
│   │   │   ├── AuthController.php
│   │   │   ├── Controller.php
│   │   │   ├── DashboardController.php
│   │   │   ├── ForgotPasswordController.php
│   │   │   ├── PasswordController.php
│   │   │   ├── PermissionsController.php
│   │   │   ├── ProfileController.php
│   │   │   ├── RegisterController.php
│   │   │   ├── ResetPasswordController.php
│   │   │   ├── RolesController.php
│   │   │   ├── UserController.php
│   │   │   ├── UsersController.php
│   │   │   └── VerificationController.php
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
│   │   └── User.php
│   ├── Notifications
│   │   ├── ResetPasswordNotification.php
│   │   └── VerifyEmailNotification.php
│   └── Providers
│       ├── AppServiceProvider.php
│       ├── AuthServiceProvider.php
│       ├── BroadcastServiceProvider.php
│       ├── EventServiceProvider.php
│       └── RouteServiceProvider.php
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
│   │   └── 2022_11_02_051027_update_settings_table.php
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
│   │   │   ├── app-legacy.433c7c11.js
│   │   │   ├── app-legacy.c0ed8668.js
│   │   │   ├── app.2bd2621f.css
│   │   │   ├── app.3f641b8b.js
│   │   │   ├── app.50bd7134.css
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
│   │   │   ├── vendor-legacy.f28d9fab.js
│   │   │   └── vendor.a027a23b.js
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
│   │   └── app.css
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
│   │   │   ├── common.js
│   │   │   └── users.js
│   │   ├── store
│   │   │   ├── auth.js
│   │   │   ├── index.js
│   │   │   ├── sidebar.js
│   │   │   └── toast.js
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

54 directories, 243 files
```

* Tree command can be installed using brew: `brew install tree`
* File tree generated using command `tree -a -I '.git|node_modules|vendor|storage|tests|.DS_Store|.env'`

### License
Laravel-Spa is licensed under the [MIT license](https://opensource.org/licenses/MIT). Enjoy!
