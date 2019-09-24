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

// Schedule Routes
Route::get('schedule/byGrid', 'ScheduleController@byGrid');
Route::get('schedule/byTime', 'ScheduleController@byTime');
Route::get('schedule/byTime/{location}', 'ScheduleController@byLocation');

// Location Routes
Route::get('locations', 'LocationController@index');
Route::post('location/create', 'LocationController@store')->middleware('auth:api');
Route::post('location/destroy/{id}', 'LocationController@destroy')->middleware('auth:api');

// Setting Routes
Route::get('setting/{key}', 'SettingController@getByKey');
Route::get('settings/social', 'SettingController@getSocial');

// Rules Routes
Route::get('rules', 'RuleController@index');
Route::post('rule/create', 'RuleController@store')->middleware('auth:api');
Route::post('rule/update/{id}', 'RuleController@update')->middleware('auth:api');
Route::get('rule/destroy/{id}', 'RuleController@destroy')->middleware('auth:api');

// Exhibitors Routes
Route::get('exhibitors', 'ExhibitorController@index');
Route::post('exhibitor/create', 'ExhibitorController@store')->middleware('auth:api');
Route::post('exhibitor/update/{id}', 'ExhibitorController@update')->middleware('auth:api');
Route::get('exhibitor/destroy/{id}', 'ExhibitorController@destroy')->middleware('auth:api');

// Guests Routes
Route::get('guests', 'GuestController@index');
Route::get('guest/{id}', 'GuestController@view');
Route::post('guest/create', 'GuestController@store')->middleware('auth:api');
Route::post('guest/update/{id}', 'GuestController@update')->middleware('auth:api');
Route::get('guest/destroy/{id}', 'GuestController@destroy')->middleware('auth:api');

// Events Routes
Route::get('event/{id}', 'EventController@view');
Route::post('event/create', 'EventController@store')->middleware('auth:api');
Route::post('event/update/{id}', 'EventController@update')->middleware('auth:api');
Route::get('event/destroy/{id}', 'EventController@destroy')->middleware('auth:api');

// Home Routes
Route::get('home', 'HomeController@index');
Route::post('home/update', 'HomeController@update')->middleware('auth:api');

// Map Routes
Route::get('maps', 'MapController@index');
Route::get('map/{id}', 'MapController@view');
Route::post('map/create', 'MapController@store')->middleware('auth:api');
Route::post('map/update/{id}', 'MapController@update')->middleware('auth:api');
Route::get('map/destroy/{id}', 'MapController@destroy')->middleware('auth:api');