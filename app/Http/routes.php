<?php

/*
 Lumen doesn't support JSON data via put request, we need to use post
*/

$app->get('/', function () {
    return redirect('/index.html');
});

$app->get('/login', 'LoginController@login');
$app->get('/loginCallBack', 'LoginController@callBack');

$app->group(['middleware' => 'auth', 'namespace' => 'App\Http\Controllers'],
    function () use ($app) {
        $app->get('user', 'UserController@get');
        $app->delete('user', 'UserController@remove');

        $app->get('constructions', 'ConstructionController@getUserConstructions');
        $app->post('construction', 'ConstructionController@add'); //require: construction
        $app->post('construction/{id}', 'ConstructionController@update'); //require: construction
        $app->delete('construction/{id}', 'ConstructionController@remove');

        $app->get('categories/{construction_id}', 'CategoryController@getCategoriesByConstruction');
        $app->post('category', 'CategoryController@add'); //require: construction_id, name
        $app->post('category/{id}', 'CategoryController@update'); //require: name
        $app->delete('category/{id}', 'CategoryController@remove');
		
		$app->get('subcategories/{category_id}', 'SubCategoryController@getSubCategoriesByCategory');
		$app->post('subcategories', 'SubCategoryController@add');
		$app->post('subcategories/{id}', 'SubCategoryController@update');
		$app->delete('subcategories/{id}', 'SubCategoryController@remove');


        $app->get('works', 'WorkController@getAll'); //require: supplier_id

        $app->get('suppliers', 'SupplierController@getAll');

        $app->get('categoryWorks/{subcategory_id}', 'CategoryWorkController@getWorks');
        $app->post('categoryWork', 'CategoryWorkController@add'); //require: subcategory_id, work_id || category_id, new_work_code, old_work_code
        $app->post('categoryWork/{category_id}/{work_code}', 'CategoryWorkController@update'); //require: value, no
        $app->delete('categoryWork/{category_id}/{work_code}', 'CategoryWorkController@remove');

        $app->post('description', 'DescriptionController@add'); //require: category_id, work_code
        $app->post('description/{id}', 'DescriptionController@update'); //require: description
        $app->delete('description/{id}', 'DescriptionController@remove');
    });