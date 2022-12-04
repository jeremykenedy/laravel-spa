{{-- @extends('errors::minimal')
@section('title', __('Service Unavailable'))
@section('code', '503')
@section('message', __('Service Unavailable'))
--}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @if($ga_enabled)
            <!-- Google tag (gtag.js) -->
            <script async src="https://www.googletagmanager.com/gtag/js?id={{$ga_key}}"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '{{ $ga_key }}');
            </script>
        @endif
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name') }}</title>
        @vite(['resources/css/app.css'])
    </head>
    <body class="bg-slate-800 h-screen antialiased leading-none font-sans overflow-x-hidden overflow-y-auto">
        <section class="mt-6">
            <div class="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
                <svg class="mx-auto mb-4 w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M331.8 224.1c28.29 0 54.88 10.99 74.86 30.97l19.59 19.59c40.01-17.74 71.25-53.3 81.62-96.65c5.725-23.92 5.34-47.08 .2148-68.4c-2.613-10.88-16.43-14.51-24.34-6.604l-68.9 68.9h-75.6V97.2l68.9-68.9c7.912-7.912 4.275-21.73-6.604-24.34c-21.32-5.125-44.48-5.51-68.4 .2148c-55.3 13.23-98.39 60.22-107.2 116.4C224.5 128.9 224.2 137 224.3 145l82.78 82.86C315.2 225.1 323.5 224.1 331.8 224.1zM384 278.6c-23.16-23.16-57.57-27.57-85.39-13.9L191.1 158L191.1 95.99l-127.1-95.99L0 63.1l96 127.1l62.04 .0077l106.7 106.6c-13.67 27.82-9.251 62.23 13.91 85.39l117 117.1c14.62 14.5 38.21 14.5 52.71-.0016l52.75-52.75c14.5-14.5 14.5-38.08-.0016-52.71L384 278.6zM227.9 307L168.7 247.9l-148.9 148.9c-26.37 26.37-26.37 69.08 0 95.45C32.96 505.4 50.21 512 67.5 512s34.54-6.592 47.72-19.78l119.1-119.1C225.5 352.3 222.6 329.4 227.9 307zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24S88 434.7 88 448C88 461.3 77.25 472 64 472z"/></svg>
                <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-whitelg:mb-6 md:text-5xl xl:text-6xl dark:text-white">Under Maintenance</h1>
                <p class="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">Our Enterprise administrators are performing scheduled maintenance.</p>
            </div>
        </section>
        <script> const GA_ENABLED="{{ $ga_enabled }}"</script>
        <script> const GA_TAG="{{ $ga_key }}"</script>
    </body>
</html>
