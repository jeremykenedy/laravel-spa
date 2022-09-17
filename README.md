# Laravel SPA

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

|Email|Password|Access|
|:------------|:------------|
|user@user.com|password|

### Screenshots
![Home]()
![About]()
![Login]()
![Register]()
![Dashboard]()
![Settings - Profile]()
![Settings - Password]()
![Forgot Password]()
![Reset Password]()

### File Tree
```
LaravelSpa
├── .browserslistrc
├── .editorconfig
├── .env
├── .env.example
├── .eslintrc.js
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .styleci.yml
├── LICENSE
├── README.md
├── app
│   ├── Console
│   │   └── Kernel.php
│   ├── Exceptions
│   │   └── Handler.php
│   ├── Http
│   │   ├── Controllers
│   │   │   ├── AuthController.php
│   │   │   ├── Controller.php
│   │   │   ├── ForgotPasswordController.php
│   │   │   ├── PasswordController.php
│   │   │   ├── ProfileController.php
│   │   │   ├── RegisterController.php
│   │   │   ├── ResetPasswordController.php
│   │   │   ├── UserController.php
│   │   │   └── VerificationController.php
│   │   ├── Kernel.php
│   │   └── Middleware
│   │       ├── Authenticate.php
│   │       ├── EncryptCookies.php
│   │       ├── PreventRequestsDuringMaintenance.php
│   │       ├── RedirectIfAuthenticated.php
│   │       ├── TrimStrings.php
│   │       ├── TrustHosts.php
│   │       ├── TrustProxies.php
│   │       └── VerifyCsrfToken.php
│   ├── Models
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
│   ├── filesystems.php
│   ├── hashing.php
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── sanctum.php
│   ├── services.php
│   ├── session.php
│   └── view.php
├── database
│   ├── .gitignore
│   ├── factories
│   │   └── UserFactory.php
│   ├── migrations
│   │   ├── 2014_10_12_000000_create_users_table.php
│   │   ├── 2014_10_12_100000_create_password_resets_table.php
│   │   ├── 2019_08_19_000000_create_failed_jobs_table.php
│   │   ├── 2019_12_14_000001_create_personal_access_tokens_table.php
│   │   ├── 2021_04_26_093603_create_jobs_table.php
│   │   └── 2022_09_05_192055_update_users_table.php
│   └── seeders
│       └── DatabaseSeeder.php
├── env.d.ts
├── license.svg
├── package-lock.json
├── package.json
├── phpunit.xml
├── postcss.config.js
├── prettier.config.js
├── prettierrc.json
├── public
│   ├── .htaccess
│   ├── build
│   │   ├── assets
│   │   │   ├── app-legacy.3ad2cd47.js
│   │   │   ├── app-legacy.c0ed8668.js
│   │   │   ├── app.01108a3d.css
│   │   │   ├── app.1f8de6b6.css
│   │   │   ├── app.5665825f.js
│   │   │   ├── fa-brands-400.3fe890d0.woff2
│   │   │   ├── fa-brands-400.c7ae37d3.ttf
│   │   │   ├── fa-regular-400.fdc1f753.ttf
│   │   │   ├── fa-regular-400.fe69d948.woff2
│   │   │   ├── fa-solid-900.6d53c706.ttf
│   │   │   ├── fa-solid-900.d27bc752.woff2
│   │   │   ├── fa-v4compatibility.4d73f280.ttf
│   │   │   ├── fa-v4compatibility.7d1c2ce5.woff2
│   │   │   └── polyfills-legacy.b74fa8a6.js
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
│   ├── js
│   │   ├── app.js
│   │   ├── bootstrap.js
│   │   ├── components
│   │   │   ├── AppButton.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppNav.vue
│   │   │   ├── AppToast.vue
│   │   │   ├── CircleSvg.vue
│   │   │   ├── Errors.vue
│   │   │   ├── Success.vue
│   │   │   └── VerifyNotice.vue
│   │   ├── middleware
│   │   │   ├── auth.js
│   │   │   ├── guest.js
│   │   │   └── middlewarePipeline.js
│   │   ├── router
│   │   │   ├── index.js
│   │   │   └── routes.js
│   │   ├── store
│   │   │   ├── auth.js
│   │   │   ├── index.js
│   │   │   └── toast.js
│   │   └── views
│   │       ├── About.vue
│   │       ├── App.vue
│   │       ├── Blank.vue
│   │       ├── Dashboard.vue
│   │       ├── ForgotPassword.vue
│   │       ├── Home.vue
│   │       ├── Login.vue
│   │       ├── Password.vue
│   │       ├── Profile.vue
│   │       ├── Register.vue
│   │       ├── ResetPassword.vue
│   │       ├── Settings.vue
│   │       └── VerifyEmail.vue
│   ├── lang
│   │   └── en
│   │       ├── auth.php
│   │       ├── pagination.php
│   │       ├── passwords.php
│   │       └── validation.php
│   └── views
│       ├── app.blade.php
│       └── welcome.blade.php
├── routes
│   ├── api.php
│   ├── channels.php
│   ├── console.php
│   └── web.php
├── server.php
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.vite-config.json
└── vite.config.ts

33 directories, 161 files
```

* Tree command can be installed using brew: `brew install tree`
* File tree generated using command `tree -a -I '.git|node_modules|vendor|storage|tests'`

### License
Laravel-Spa is licensed under the [MIT license](https://opensource.org/licenses/MIT). Enjoy!
