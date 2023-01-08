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
        <meta name="description" content="{{ config('settings.description') }}">
        <meta name="keywords" content="{{ config('settings.keywords') }}">
        <meta name="author" content="{{ config('settings.author') }}">
        <link rel="icon" href="/favicon.ico">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
        <link rel="mask-icon" href="/favicon-32x32.png" color="#FFFFFF">
        <meta name="theme-color" content="#ffffff">
        @vite(['resources/css/app.css'])
    </head>
    <body class="bg-gray-50 h-screen antialiased leading-none font-sans overflow-x-hidden overflow-y-auto">
        <div id="app"  v-cloak></div>
        <script> const GA_ENABLED="{{ $ga_enabled }}"</script>
        <script> const GA_TAG="{{ $ga_key }}"</script>
        <script> const APP_URL="{{ config('app.url') }}"</script>
        <script> const SENTRY_ENABLED="{{ config('services.sentry.enabled') }}"</script>
        <script> const SENTRY_FEEDBACK_ENABLED="{{ config('services.sentry.feedback-enabled') }}"</script>
        <script> const SENTRY_DSN="{{ config('sentry.dsn') }}"</script>
        <script> const ENVIRONMENT="{{ config('app.env') }}"</script>
        @vite(['resources/js/app.js'])
    </body>
</html>
