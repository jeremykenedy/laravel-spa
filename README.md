## Laravel 11 Vue.js 3 SPA Starter Boilerplate

A simple and clean boilerplate to start a new SPA project with authentication, user, roles, permissions management and more features. This boilerplate uses the following tools:

[![](https://img.shields.io/badge/vue.js-v3.5-04C690.svg)](https://vuejs.org)
[![](https://img.shields.io/badge/Laravel-v11.x-ff2e21.svg)](https://laravel.com)
[![](https://img.shields.io/badge/bootstrap-v5.3-712cf9.svg)](https://getbootstrap.com)
[![](https://img.shields.io/badge/axios-v1.7-5A29E4.svg)](https://axios-http.com)
[![](https://img.shields.io/badge/vite-v5.0-646cff.svg)](https://vitejs.dev)

- [Laravel 11.x](https://github.com/laravel/laravel)
- [Laravel Sanctum](https://laravel.com/docs/11.x/sanctum)
- [Vue 3](https://github.com/vuejs/vue)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Vue I18n](https://vue-i18n.intlify.dev)
- [Laravel Request Docs](https://github.com/rakutentech/laravel-request-docs)

Laravel is accessible, and powerful, and provides tools required for large, robust applications.

## Features

The following Sanctum features are implemented in this Vue SPA:

- ✅ Laravel 11
- ✅ Vue 3
- ✅ VueRouter
- ✅ Pinia
- ✅ Vue I18n Multi-Language
- ✅ Login
- ✅ Password Reset
- ✅ Registration
- ✅ Admin Panel
- ✅ Profile Management
- ✅ User Management
- ✅ Roles Management
- ✅ Permissions Management
- ✅ Password Change
- ✅ E-Mail Verification
- ✅ Posts Management
- ✅ Frontend Blog
- ✅ Bootstrap 5
- ✅ Automatic Api Documentation  -- route  /api-docs
- ✅ Browser Sessions - Other Device Logout
- ✅ User Activity Logs

## How To Use
#### Clone the repository

```bash
git clone https://github.com/irabbi360/laravel-vue3-spa-starter.git
```

#### Copy .env.example file to .env and edit credentials also set the app URL

#### Install Via Composer

```bash
composer install
```

#### Generate Application Key

```bash
php artisan key:generate
```

#### Migrate Database

```bash
php artisan migrate
```

#### Run Seeder

```bash
php artisan db:seed
```

#### Install Node Dependencies

```bash
npm install or yarn install

npm run dev or yarn dev
```
#### Production

```bash
npm run build or yarn build
```

## Email Verification

To enable email verification, ensure your `App\User` model implements the `Illuminate\Contracts\Auth\MustVerifyEmail` contract.

## N.B

If you want to use Laravel 10 or 9 version, please use laravel_10 or laravel_9 branch.

## Contributing

Thank you for considering contributing to the project! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

To ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please e-mail via [fazrabbi010@gmail.com](mailto:fazrabbi010@gmail.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).    
The Vue framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).    
This repository is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT). 
