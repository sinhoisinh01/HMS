<?php

/*
 Lumen doesn't support JSON data via angular put request, we need to use post
 A add request require the whole object without id and user_id (except for add subcategoryWork)
 Add post return the whole object (without user_id) if there an id, void if not
 Update post and delete return void
*/

$app->get('/', function () {
    return redirect('/index.html');
});

$app->get('/login', 'LoginController@login');
$app->get('/loginCallBack', 'LoginController@callBack');

$app->group(['middleware' => 'auth', 'namespace' => 'App\Http\Controllers'],
    function () use ($app) {
        //return: {name,email,pictureURL}
        $app->get('user', 'UserController@get');
        $app->delete('user', 'UserController@remove');

        //return: [{id,name,address}]
        $app->get('suppliers', 'SupplierController@get');
        $app->post('supplier', 'SupplierController@add');
        $app->post('supplier/{id}', 'SupplierController@update');
        $app->delete('supplier/{id}', 'SupplierController@remove');

        //return: [{...constructionWithoutUserId,created_at,updated_at}]
        $app->get('constructions', 'ConstructionController@get');
        $app->post('construction', 'ConstructionController@add');
        $app->post('construction/{id}', 'ConstructionController@update');
        $app->delete('construction/{id}', 'ConstructionController@remove');

        //require: construction_id
        //return: [{id,name}]
        $app->get('categories', 'CategoryController@get');
        $app->post('category', 'CategoryController@add');
        $app->post('category/{id}', 'CategoryController@update');
        $app->delete('category/{id}', 'CategoryController@remove');

        $app->post('subcategory', 'SubCategoryController@add');
        $app->post('subcategory/{id}', 'SubCategoryController@update');
        $app->delete('subcategory/{id}', 'SubCategoryController@remove');

        //require: construction_id
        //return: [{id,code,name,unit,price}]
        $app->get('works', 'WorkController@get');
        $app->post('work', 'WorkController@add');
        $app->post('work/{id}', 'WorkController@update');
        $app->delete('work/{id}', 'WorkController@remove');

        //require: category_id
        //return: [{id,name,no,subcategory_works=[{id,work_id,no,unit,value,descriptions=[{id,name,no,amount,length,width,height,value}]]]
        $app->get('categoryWorks', 'SubcategoryWorkController@get');
        $app->post('subcategoryWork', 'SubcategoryWorkController@add');
        $app->post('subcategoryWork/{id}', 'SubcategoryWorkController@update');
        $app->delete('subcategoryWork/{id}', 'SubcategoryWorkController@remove');

        $app->post('description', 'DescriptionController@add');
        $app->post('description/{id}', 'DescriptionController@update');
        $app->delete('description/{id}', 'DescriptionController@remove');

        //require: construction_id
        //return: [{id,code,name,unit,price}]
        $app->get('resources', 'ResourceController@get');
        $app->post('resource', 'ResourceController@add');
        $app->post('resource/{id}', 'ResourceController@update');
        $app->delete('resource/{id}', 'ResourceController@remove');

        //return: [{resource_id,work_id,value}]
        $app->get('resourcesWorks', 'ResourceWorkController@get');
        $app->post('resourceWork', 'ResourceWorkController@add');
        $app->post('resourceWork/{resource_id}/{work_id}', 'ResourceWorkController@update');
        $app->delete('resourceWork/{resource_id}/{work_id}', 'ResourceWorkController@remove');

        //require: supplier_id
        //return: [{resource_id,price}]
        $app->get('resourcesSupplier', 'ResourceSupplierController@get');
        $app->post('resourceSupplier', 'ResourceSupplierController@add');
        $app->post('resourceSupplier/{resource_id}/{supplier_id}', 'ResourceSupplierController@update');
        $app->delete('resourceSupplier/{resource_id}/{supplier_id}', 'ResourceSupplierController@remove');

        $app->post('constructionResource', 'ConstructionResourceController@add');
        $app->post('constructionResource/{construction_id}/{resource_id}', 'ConstructionResourceController@update');
        $app->delete('constructionResource/{construction_id}/{resource_id}', 'ConstructionResourceController@remove');
    });