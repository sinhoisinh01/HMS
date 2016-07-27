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

$app->get('/test', 'CategoryController@test');

$app->group(['middleware' => 'auth', 'namespace' => 'App\Http\Controllers'],
    function () use ($app) {
        $app->get('/user', 'UserController@get');
        $app->put('/user', 'UserController@update');
        $app->delete('/user','UserController@delete');

        $app->get('/recentConstructions', 'ConstructionController@getRecent');
        $app->get('/constructions', 'ConstructionController@getAll');
        $app->post('/construction', 'ConstructionController@add');
        $app->get('/construction/{construction_id}', 'ConstructionController@get');
        $app->put('/construction/{construction_id}', 'ConstructionController@update');
        $app->delete('/construction/{construction_id}', 'ConstructionController@remove');

        $app->get('/categories', 'CategoryController@getAll');
        $app->post('/category', 'CategoryController@add');
        $app->get('/category/{category_id}', 'CategoryController@get');
        $app->put('/category/{category_id}', 'CategoryController@update');
        $app->delete('/category/{category_id}', 'CategoryController@remove');
    });