<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name') }}</title>
        <script>
            window.opener.postMessage({ token: "{{ $token }}" }, "{{ url('/') }}")
            window.close()
        </script>
    </head>
    <body>
    </body>
</html>
