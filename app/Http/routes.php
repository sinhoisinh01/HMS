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
        $app->get('/user', 'UserController@get');
        $app->put('/user', 'UserController@update');
        $app->delete('/user','UserController@delete');
        $app->get('/test', 'Controller@test');
        $app->get('/recentConstructions', 'ConstructionController@getRecent');
        $app->get('/constructions', 'ConstructionController@getUserConstructions');
        $app->post('/construction', 'ConstructionController@add');
        $app->get('/construction/{construction_id}', 'ConstructionController@get');
        $app->put('/construction/{construction_id}', 'ConstructionController@update');
        $app->delete('/construction/{construction_id}', 'ConstructionController@remove');

        $app->get('/categories/{construction_id}', 'CategoryController@getConstructionCategories');
        $app->post('/category', 'CategoryController@add');
        $app->get('/category/{category_id}', 'CategoryController@get');
        $app->put('/category/{category_id}', 'CategoryController@update');
        $app->delete('/category/{category_id}', 'CategoryController@remove');

        $app->get('/works', 'WorkController@getAll');

        $app->get('/categoryWorks/{category_id}', 'CategoryWorkController@getWorks');
        $app->get('/categoryWork/{category_id}/{work_id}', 'CategoryWorkController@get');
        $app->post('/categoryWork/{category_id}/{work_id}', 'CategoryWorkController@add');
        $app->put('/categoryWork/{category_id}/{work_id}', 'CategoryWorkController@update');
        $app->delete('/categoryWork/{category_id}/{work_id}', 'CategoryWorkController@remove');

        $app->get('/suppliers', 'SupplierController@getAll');
        $app->get('/supplier/construction/{construction_id}', 'SupplierController@getConstructionSupplier');
        $app->put('/supplier/construction/{construction_id}/{supplier_id}', 'SupplierController@changeSupplier');
    });