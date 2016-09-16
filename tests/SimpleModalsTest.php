<?php

use App\Models\Category;
use App\Models\Construction;
use App\Models\Description;
use App\Models\Resource;
use App\Models\Subcategory;
use App\Models\SubcategoryWork;
use App\Models\Supplier;
use App\Models\Work;

class SimpleModalsTest extends TestCase
{
    public function factoriseTest($user, $component, $componentUpdate, $class, $componentName,
                                  $tableName, $testGet, $keysExpected = [])
    {
        $this->actingAs($user)->post('/' . $componentName, [$componentName => $component])
            ->seeInDatabase('' . $tableName, $component)
            ->assertObjectHasAttribute('id', json_decode($this->response->content()));
        $component_id = $class::all()->last()->id;
        if ($testGet)
            $this->actingAs($user)->get('/' . $tableName)
                ->seeJson(['id' => $component_id])
                ->assertEquals($keysExpected, array_keys((array)json_decode($this->response->content())[0]));
        $this->actingAs($user)->post('/' . $componentName . '/' . $component_id, [$componentName => $componentUpdate])
            ->seeInDatabase('' . $tableName, array_merge(['id' => $component_id], $componentUpdate));
        $this->actingAs($user)->delete('/' . $componentName . '/' . $component_id)
            ->notSeeInDatabase('' . $tableName, ['id' => $component_id]);
        $user->delete();
    }
	
	public function testSupplier()
    {
        $user = factory('App\Models\User')->create();
        $suppliers = factory('App\Models\Supplier', 2)->make()->toArray();
        $this->factoriseTest($user, $suppliers[0], $suppliers[1], Supplier::class, 'supplier',
            'suppliers', true, ['id', 'name', 'address']);
    }


    public function testResource()
    {
        $user = factory('App\Models\User')->create();
        $resources = factory('App\Models\Resource', 2)->make()->toArray();
        $this->factoriseTest($user, $resources[0], $resources[1], Resource::class, 'resource',
            'resources', true, ['id', 'code', 'name', 'unit', 'price']);
    }

    public function testConstruction()
    {
        $user = factory('App\Models\User')->create();
        $constructions = factory('App\Models\Construction', 2)->make()->toArray();
        $this->factoriseTest($user, $constructions[0], $constructions[1], Construction::class, 'construction',
            'constructions', true, ['id', 'name', 'supplier_id', 'address', 'investor', 'contractor', 'type',
                'design_type', 'level', 'created_at', 'updated_at']);
    }

    public function testWork()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        $works = factory('App\Models\Work', 2)->make(['construction_id' => Construction::all()->last()->id])->toArray();
        $this->factoriseTest($user, $works[0], $works[1], Work::class, 'work',
            'works', true, ['id', 'code', 'name', 'unit', 'price']);
    }

    public function testCategory()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        $categories = factory('App\Models\Category', 2)->make(['construction_id' => Construction::all()->last()->id])->toArray();
        $this->factoriseTest($user, $categories[0], $categories[1], Category::class, 'category',
            'categories', true, ['id', 'name']);
    }

    public function testSubcategory()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        Construction::all()->last()->categories()->save(factory('App\Models\Category')->make());
        $subcategories = factory('App\Models\Subcategory', 2)->make(['category_id' => Category::all()->last()->id])->toArray();
        $this->factoriseTest($user, $subcategories[0], $subcategories[1], Subcategory::class, 'subcategory',
            'subcategories', false);
    }

    public function testDescription()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        Construction::all()->last()->categories()->save(factory('App\Models\Category')->make());
        Category::all()->last()->subcategories()->save(factory('App\Models\Subcategory')->make());
        Subcategory::all()->last()->works()->save(Work::find(random_int(1, 1111)));
        $descriptions = factory('App\Models\Description', 2)->make(
            ['subcategory_id' => SubcategoryWork::all()->last()->subcategory_id,
                'work_id' => SubcategoryWork::all()->last()->work_id])->toArray();
        $this->factoriseTest($user, $descriptions[0], $descriptions[1], Description::class, 'description',
            'descriptions', false);
    }
}
