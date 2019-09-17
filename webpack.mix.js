const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/admin-app.js', 'public/js').version()
   .react('resources/js/public-app.js', 'public/js').version()
   .sass('resources/sass/app.scss', 'public/css').version();
