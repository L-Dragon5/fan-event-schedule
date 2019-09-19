<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ env('MIX_EVENT_NAME') }}</title>

        <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css">

        <script defer src="{{ mix('js/public-app.js') }}"></script>
    </head>
    <body>
        <div id="public-root"></div>
    </body>
</html>
