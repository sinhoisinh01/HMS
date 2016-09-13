<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\User::class, function ($faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email
    ];
});

$factory->define(App\Models\Construction::class, function ($faker) {
    return [
        'name' => $faker->name,
        'supplier_id' => 31,
        'address' => $faker->address,
        'investor' => $faker->name,
        'contractor' => $faker->name,
        'type' => $faker->name,
        'design_type' => $faker->name,
        'level' => $faker->randomDigit
    ];
});

$factory->define(App\Models\Category::class, function ($faker) {
    return [
        'name' => $faker->name
    ];
});

$factory->define(App\Models\Subcategory::class, function ($faker) {
    return [
        'name' => $faker->name
    ];
});

$factory->define(App\Models\SubcategoryWork::class, function ($faker, $category_id) {
    return [
        'category_id' => $category_id,
        'work_id' => $faker->unique($reset = true)->numberBetween($min = 1, $max = 1111),
        'value' => $faker->randomFloat($min = 0)
        //no
    ];
});

$factory->define(App\Models\Description::class, function ($faker) {
    return [
        'name' => $faker->name,
        'amount' => $faker->randomFloat($min = 0),
        'length' => $faker->randomFloat($min = 0),
        'width' => $faker->randomFloat($min = 0),
        'height' => $faker->randomFloat($min = 0),
        'value' => $faker->randomFloat($min = 0)
    ];
});

$factory->define(App\Models\Work::class, function ($faker) {
    return [
        'code' => 'TT.' . $faker->name,
        'document' => $faker->name,
        'name' => $faker->name,
        'unit' => '100m2',
    ];
});

$factory->define(App\Models\Supplier::class, function ($faker) {
    return [
        'name' => $faker->name,
        'address' => $faker->address
    ];
});

$factory->define(App\Models\Resource::class, function ($faker) {
    return [
        'code' => $faker->name,
        'name' => $faker->name,
        'unit' => 'm'
    ];
});

$factory->define(App\Models\ResourceSupplier::class, function ($faker) {
    return [
        'price' => $faker->numberBetween($min = 0, $max = 1000000000)
    ];
});

$factory->define(App\Models\ResourceWork::class, function ($faker) {
    return [
        'value' => $faker->randomFloat($min = 0)
    ];
});

$factory->define(App\Models\ConstructionResource::class, function ($faker) {
    return [
        'price' => $faker->numberBetween($min = 0, $max = 1000000000)
    ];
});


