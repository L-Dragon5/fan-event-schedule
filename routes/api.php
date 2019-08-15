<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('schedule', 'ScheduleController@index');

Route::get('setting/{key}', 'SettingController@getByKey');
Route::get('settings/social', 'SettingController@getSocial');
Route::get('rules', 'RuleController@index');
Route::get('sellers', 'SellerController@index');
Route::get('guests', 'GuestController@index');

Route::get('event/{id}', 'EventController@view');