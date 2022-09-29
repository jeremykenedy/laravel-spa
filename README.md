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
![Home](https://laravel-spa.s3.us-west-2.amazonaws.com/home.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030347Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=f275b8244c27af01961717ee3e1ed52116b4839b490fcc1d7ac55d54efcc1ffa)
![About](https://laravel-spa.s3.us-west-2.amazonaws.com/about.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030253Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=43e25c333d28c87f691696d697ff438f865f1a75eb7d4289c340af27fb61c63f)
![Login](https://laravel-spa.s3.us-west-2.amazonaws.com/login.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030356Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=1d23a59ab0b2e0590cedba3d3f52b516c171393ed3cd202c947a550efd097fd4)
![Register](https://laravel-spa.s3.us-west-2.amazonaws.com/register.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030518Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=2b3e09f783ee97c0330bb4b1a0b0ba4a1acb344cec4375e4c1e13cbabdee5eb6)
![Dashboard](https://laravel-spa.s3.us-west-2.amazonaws.com/dashboard.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030324Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=88067ddafa94b708223d2fcc530f63a48e2c15c9dc1ca1f10175ec916340fc73)
![Settings - Profile](https://laravel-spa.s3.us-west-2.amazonaws.com/profile1.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030442Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=4ceb59d0081c90c474d746337710a96fdc26c36d61ebff73d60102a6c52cf96c)
![Settings - Password](https://laravel-spa.s3.us-west-2.amazonaws.com/profile2.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030449Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=d580dc6cf63e98e6d2bd5dc36e5739c98bb5b32d573b480eed2d19b30686556c)
![Profile Dark](https://laravel-spa.s3.us-west-2.amazonaws.com/profile3.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030459Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=7f98b02e021dd90eb2660398c048cc95a46ef5d43156623f6db4358f9e90c679)
![Forgot Password](https://laravel-spa.s3.us-west-2.amazonaws.com/forgot.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030335Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=7fc865159fe81f14e69eb502d287a0992cdfc7d0156a97c610f8e9e0ebe53e8d)
![Reset Password](https://laravel-spa.s3.us-west-2.amazonaws.com/reset.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030529Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=0b6226161148996d7c91cbf90e058f499cebe6eb17b09a8aa750d6f17a839ab1)
![Mobile Menu](https://laravel-spa.s3.us-west-2.amazonaws.com/mobile-menu.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030428Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=3855616a6b72d6f9eb5bb4c4521a2860b8199abcc9ea02492ad3da757ff932ab)
![Mobile Login](https://laravel-spa.s3.us-west-2.amazonaws.com/mobile-login.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjGt0n%2BzFEQKBPpb%2BuuKcAaRWFcK7uYYnzmgYD%2FzQGzQIgYJxUmFAscxR6mRPA7lCnIKttq%2BFDcBuux4fwf%2FL5UKUqmQIIPBAAGgwwNDcyNjY0NDE1NjQiDLGPMMy9p80R%2BbCCVyr2AeZ6G2Zpr0Jd2e8TDy9D7RccfYC0dUGtgkwGLPNQa0MVOd8lnbWcJu76PimuOFY5JrCtOpRB63QVAbGkDkmsu94rxJnH%2FJojjP6lIVbiX7dKiBV58tfia9XSsQwl9UesB1FFHRURsLdna6br1LdqC4qwWmA%2BU2lzcisoYPgVLvzLBuJWXU4Rf4bVl3S6AWs1%2B4i8OOi1jLT6fgp5qMY%2F8M1uJbqd4Xcq8WP8%2B7df9uDRyKzcooTWamZcxXSGM3bAprceOjgMUr7dNZxBb9C%2B5vWnWmYP5X9JsmPk08bb%2BeT%2F67VP10%2B3PrX8LWI5%2FC1avl6lfDrrBTDNjtSZBjrfAfnDMyanO6%2BcKK0mIpRmqYggyyV2yb2i3nm98xtZPQWqOZGMfWhrpDRmKsMoYpadQLHaPAjVONtlPAr0F7Iy41N4zcUYB57YnzW4BLoaaphLzHyH4GJuuJMtbbn9SXduBUvxyDnlWF0%2B9RxP1u7%2BvCLPa%2FnCalVgslW%2FReZfKQy0Iz3XgDVkCbRgO8NI8QxvQIGg6M27YI4Al8aBT7p9icoBYpbXRYrCCr6YSQyJAW0PUPTT6i5ERNAu0Fx6I8D%2F%2BTVrsJT6OHf5lgxhLSfCQ6RVdVukln3fE0Rk1LoSA5A%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220929T030406Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQWAKMVFOM2LQFCVC%2F20220929%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=ce8e8b076de33f2eef7d894792280edb1ab003318941fea1e01870d01b14e6df)

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
