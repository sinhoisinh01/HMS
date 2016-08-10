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

$app->get('/login', 'LoginController@login');
$app->get('/loginCallBack', 'LoginController@callBack');

$app->group(['middleware' => 'auth', 'namespace' => 'App\Http\Controllers'],
    function () use ($app) {
        $app->get('/refreshToken', 'LoginController@refreshToken');

        $app->get('/user', 'UserController@get');
        $app->delete('/user', 'UserController@remove');

        $app->get('/constructions', 'ConstructionController@getUserConstructions');
        $app->post('/construction', 'ConstructionController@add');
        $app->get('/construction/{id}', 'ConstructionController@get');
        $app->put('/construction/{id}', 'ConstructionController@update');
        $app->delete('/construction/{id}', 'ConstructionController@remove');

        $app->get('/categories/{construction_id}', 'CategoryController@getConstructionCategories');
        $app->post('/category', 'CategoryController@add');
        $app->get('/category/{id}', 'CategoryController@get');
        $app->put('/category/{id}', 'CategoryController@update');
        $app->delete('/category/{id}', 'CategoryController@remove');

        $app->get('/works', 'WorkController@getAll');

        $app->get('/categoryWorks/{category_id}', 'CategoryWorkController@getWorks');
        $app->get('/categoryWork/{category_id}/{work_code}', 'CategoryWorkController@get');
        $app->post('/categoryWork/{category_id}/{work_code}', 'CategoryWorkController@add');
		$app->post('/categoryWork/{category_id}/{work_code}/{new_work_code}', 'CategoryWorkController@replace');
        $app->put('/categoryWork/{category_id}/{work_code}', 'CategoryWorkController@update');
        $app->delete('/categoryWork/{category_id}/{work_code}/{no}', 'CategoryWorkController@remove');

        $app->get('/suppliers', 'SupplierController@getAll');
        $app->get('/supplier/{id}', 'SupplierController@get');
    });