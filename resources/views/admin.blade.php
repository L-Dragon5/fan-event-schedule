<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Admin | {{ env('MIX_EVENT_NAME') }}</title>
        
        <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css">
        <link href="//cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote-lite.css" rel="stylesheet">

        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> 
        <script defer src="//cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote-lite.js"></script>
        <script defer src="{{ mix('js/admin-app.js') }}"></script>
    </head>
    <body>
        <div id="admin-root"></div>
        <script>
        $(function () {
            $('#summernote').summernote({
            placeholder: 'Enter text here...',
            tabsize: 2,
            height: 450
            })
        })
        </script>
    </body>
</html>
