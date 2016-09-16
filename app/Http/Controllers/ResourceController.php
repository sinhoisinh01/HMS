<?php

namespace App\Http\Controllers;

use App\Models\Construction;
use App\Models\ConstructionResource;
use App\Models\ResourceSupplier;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class ResourceController extends Controller
{
    function get(Request $request)
    {
        $cr = $rs = [];
        $construction_resource = ConstructionResource::where('construction_id', $request->input('construction_id'))
            ->get();
        foreach ($construction_resource as $item) {
            $cr[$item->resource_id] = $item->price;
        }
        $resource_supplier = ResourceSupplier::where('supplier_id', Construction::find($request->input('construction_id'))->supplier_id)
            ->get();
        foreach ($resource_supplier as $item) {
            $rs[$item->resource_id] = $item->price;
        }
        
		$resource_list = $cr + $rs;
		
		// Show all the resource with id,code,name,unit and price
		//toDo
    }
	
	function add(Request $request)
	{
		//ToDo
	}
	
	function update($id, Request $request)
	{
		//ToDo
	}
	
	function remove($id)
	{
		Resource::destroy($id);
	}
}