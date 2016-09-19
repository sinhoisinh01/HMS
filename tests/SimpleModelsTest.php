<?php

use App\Models\Category;
use App\Models\Construction;
use App\Models\Description;
use App\Models\Resource;
use App\Models\Subcategory;
use App\Models\SubcategoryWork;
use App\Models\Supplier;
use App\Models\Work;

class SimpleModelsTest extends TestCase
{
    public function testSupplier()
    {
        $user = factory('App\Models\User')->create();
        $suppliers = factory('App\Models\Supplier', 2)->make()->toArray();
        $this->factoriseTest($user, $suppliers[0], $suppliers[1], Supplier::class, 'supplier',
            'suppliers', true, 'suppliers', ['id', 'name', 'address']);
    }
	
    public function factoriseTest($user, $component, $componentUpdate, $class, $componentName,
                                  $tableName, $testGet, $getName = '', $keysExpected = [], $paramName = '', $paramValue = 0)
    {
        // Test Insert
		$this->actingAs($user)->post('/' . $componentName, [$componentName => $component])
            ->seeInDatabase('' . $tableName, $component)
            ->assertObjectHasAttribute('id', json_decode($this->response->content()));
        $component_id = $class::all()->last()->id;
        
		// Test Get
		if ($testGet)
            $this->actingAs($user)->get('/' . $getName . '?' . $paramName . '=' . $paramValue)
                ->assertEquals($keysExpected, array_keys((array)json_decode($this->response->content())[0]));
        
		// Test Update
		$this->actingAs($user)->post('/' . $componentName . '/' . $component_id, [$componentName => $componentUpdate])
            ->seeInDatabase('' . $tableName, array_merge(['id' => $component_id], $componentUpdate));
        
		// Test delete
		$this->actingAs($user)->delete('/' . $componentName . '/' . $component_id)
            ->notSeeInDatabase('' . $tableName, ['id' => $component_id]);
        $user->delete();
    }

    public function testResource()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        $resources = factory('App\Models\Resource', 2)->make()->toArray();
        $this->factoriseTest($user, $resources[0], $resources[1], Resource::class, 'resource',
            'resources', true, 'resources', ['id', 'code', 'name', 'unit', 'price'], 'construction_id', Construction::all()->last()->id);
    }

    public function testConstruction()
    {
        $user = factory('App\Models\User')->create();
        $constructions = factory('App\Models\Construction', 2)->make()->toArray();
        $this->factoriseTest($user, $constructions[0], $constructions[1], Construction::class, 'construction',
            'constructions', true, 'constructions', ['id', 'name', 'supplier_id', 'address', 'investor', 'contractor', 'type',
                'design_type', 'level', 'created_at', 'updated_at']);
    }

    public function testWork()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        $works = factory('App\Models\Work', 2)->make(['construction_id' => Construction::all()->last()->id])->toArray();
        $this->factoriseTest($user, $works[0], $works[1], Work::class, 'work',
            'works', true, 'works', ['id', 'code', 'name', 'unit', 'price'], 'construction_id', Construction::all()->last()->id);
    }

    public function testCategory()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        $categories = factory('App\Models\Category', 2)->make(['construction_id' => Construction::all()->last()->id])->toArray();
        $this->factoriseTest($user, $categories[0], $categories[1], Category::class, 'category',
            'categories', true, 'categories', ['id', 'name'], 'construction_id', Construction::all()->last()->id);
    }

    public function testSubcategory()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        Construction::all()->last()->categories()->save(factory('App\Models\Category')->make());
        $subcategories = factory('App\Models\Subcategory', 2)->make(
            ['category_id' => Category::all()->last()->id])->toArray();
        $this->factoriseTest($user, $subcategories[0], $subcategories[1], Subcategory::class, 'subcategory',
            'subcategories', false);
    }

    public function testSubcategoryWork()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        Construction::all()->last()->categories()->save(factory('App\Models\Category')->make());
        Category::all()->last()->subcategories()->save(factory('App\Models\Subcategory')->make());
        $subcategoryWorks = factory('App\Models\SubcategoryWork', 2)->make(['subcategory_id' =>
            Subcategory::all()->last()->id])->toArray();
        $this->factoriseTest($user, $subcategoryWorks[0], $subcategoryWorks[1], SubcategoryWork::class, 'subcategoryWork',
            'subcategory_work', true, 'categoryWorks', ['id', 'name', 'no', 'subcategory_works'], 'category_id', Category::all()->last()->id);
    }

    public function testDescription()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        Construction::all()->last()->categories()->save(factory('App\Models\Category')->make());
        Category::all()->last()->subcategories()->save(factory('App\Models\Subcategory')->make());
        factory('App\Models\SubcategoryWork')->create(['subcategory_id' => Subcategory::all()->last()->id]);
        $descriptions = factory('App\Models\Description', 2)->make(['subcategoryWork_id' =>
            SubcategoryWork::all()->last()->id])->toArray();
        $this->factoriseTest($user, $descriptions[0], $descriptions[1], Description::class, 'description',
            'descriptions', false);
    }
}
