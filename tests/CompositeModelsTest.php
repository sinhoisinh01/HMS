<?php

use App\Models\Construction;
use App\Models\Supplier;

class CompositeModelsTest extends TestCase
{
    public function testResourceSupplier()
    {
        $user = factory('App\Models\User')->create();
        $user->suppliers()->save(factory('App\Models\Supplier')->make());
        $resourceSupplier = factory('App\Models\ResourceSupplier')->make(['supplier_id' => Supplier::all()->last()->id]);
        $resourceSupplierUpdate = factory('App\Models\ResourceSupplier')->make(['supplier_id' =>
            $resourceSupplier->supplier_id, 'resource_id' => $resourceSupplier->resource_id])->toArray();
        $this->factoriseTest($user, $resourceSupplier->toArray(), $resourceSupplierUpdate, 'resourceSupplier',
            'resource_supplier', ['resource_id', 'supplier_id'], true, 'resourcesSupplier', ['resource_id', 'price'],
            'supplier_id', Supplier::all()->last()->id);
    }

    public function factoriseTest($user, $component, $componentUpdate, $componentName, $tableName,
                                  $keys, $testGet, $getName = '', $keysExpected = [], $paramName = '', $paramValue = 0)
    {
        // Test Insert
		$this->actingAs($user)->post('/' . $componentName, [$componentName => $component])
            ->seeInDatabase('' . $tableName, $component);
        
		// Test Get
		if ($testGet)
            $this->actingAs($user)->get('/' . $getName . '?' . $paramName . '=' . $paramValue)
                ->assertEquals($keysExpected, array_keys((array)json_decode($this->response->content())[0]));
        
		// Test Update
		$this->actingAs($user)->post('/' . $componentName . '/' . $component[$keys[0]] . '/' . $component[$keys[1]],
            [$componentName => $componentUpdate])
            ->seeInDatabase('' . $tableName, $componentUpdate);
        
		// Test Delete
		$this->actingAs($user)->delete('/' . $componentName . '/' . $component[$keys[0]] . '/' . $component[$keys[1]])
            ->notSeeInDatabase('' . $tableName, [$keys[0] => $component[$keys[0]], $keys[1] => $component[$keys[1]]]);
        $user->delete();
    }

    public function testResourceWork()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        factory('App\Models\Work')->create(['construction_id' => Construction::all()->last()->id]);
        $resourcesWork = factory('App\Models\ResourceWork')->make(['work_id' => Supplier::all()->last()->id]);
        $resourcesWorkUpdate = factory('App\Models\ResourceWork')->make(['work_id' => $resourcesWork->work_id,
            'resource_id' => $resourcesWork->resource_id])->toArray();
        $this->factoriseTest($user, $resourcesWork->toArray(), $resourcesWorkUpdate, 'resourceWork',
            'resource_work', ['resource_id', 'work_id'], true, 'resourcesWorks', ['resource_id', 'work_id', 'value'], 'construction_id', Construction::all()->last()->id);
    }

    public function testConstructionResource()
    {
        $user = factory('App\Models\User')->create();
        $user->constructions()->save(factory('App\Models\Construction')->make());
        $constructionResource = factory('App\Models\ConstructionResource')
            ->make(['construction_id' => Construction::all()->last()->id]);
        $constructionResourceUpdated = factory('App\Models\ConstructionResource')->make(['construction_id' =>
            $constructionResource->construction_id, 'resource_id' => $constructionResource->resource_id])->toArray();
        $this->factoriseTest($user, $constructionResource->toArray(), $constructionResourceUpdated, 'constructionResource',
            'construction_resource', ['construction_id', 'resource_id'], false);
    }
}