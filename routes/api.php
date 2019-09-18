<?php

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

// User Routes
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register')->middleware('checkIp');
Route::get('logout', 'UserController@logout')->middleware('auth:api');
Route::get('user/canEdit', function (Request $request) { return Auth::guard('api')->user(); });

// Schedule Routes
Route::get('schedule', 'ScheduleController@index');

// Setting Routes
Route::get('setting/{key}', 'SettingController@getByKey');
Route::get('settings/social', 'SettingController@getSocial');

// Rules Routes
Route::get('rules', 'RuleController@index');

// Sellers Routese
Route::get('sellers', 'SellerController@index');

// Guests Routes
Route::get('guests', 'GuestController@index');
Route::get('guest/{id}', 'GuestController@view');

// Events Routes
Route::get('event/{id}', 'EventController@view');
Route::post('event/create', 'EventController@store')->middleware('auth:api');