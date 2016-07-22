<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () {
    return redirect('/index.html');
});

$app->group(['middleware' => 'auth', 'namespace' => 'App\Http\Controllers'],
    function () use ($app) {
    $app->get('/home', 'ConstructionController@getRecent');
    $app->get('/home/allConstructions', 'ConstructionController@getAll');
    $app->get('/construction','ConstructionController@add');
    $app->get('/construction/{construction_id}', 'CategoryController@get');
    $app->get('/construction/{construction_id}/{name}', 'CategoryController@add');
});