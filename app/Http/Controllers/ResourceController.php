<?php

namespace App\Http\Controllers;

use App\Models\Construction;
use App\Models\ConstructionResource;
use App\Models\Resource;
use App\Models\ResourceSupplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class ResourceController extends Controller
{
    function get(Request $request)
    {
        $construction_resource_prices = $resource_supplier_prices = [];
        $construction_resource = ConstructionResource::where('construction_id',
            $request->input('construction_id'))->get();
        foreach ($construction_resource as $item) {
            $construction_resource_prices[$item->resource_id] = $item->price;
        }
        $resource_supplier = ResourceSupplier::where('supplier_id',
            Construction::find($request->input('construction_id'))->supplier_id)->get();
        foreach ($resource_supplier as $item) {
            $resource_supplier_prices[$item->resource_id] = $item->price;
        }
        $prices = $construction_resource_prices + $resource_supplier_prices;
        $resources = Resource::whereIn('user_id', [1, Auth::user()->id])->get(['id', 'code', 'name', 'unit']);
        foreach ($resources as $resource) {
            if (array_key_exists($resource->id, $prices))
                $resource->price = $prices[$resource->id];
        }
        return response()->json($resources);
    }

    function add(Request $request)
    {
        $resource = $request->input('resource');
        $resource['user_id'] = Auth::user()->id;
        $resource = Resource::create($resource);
        return response()->json($resource);
    }

    function update($id, Request $request)
    {
        Resource::find($id)->update($request->input('resource'));
    }

    function remove($id)
    {
        Resource::destroy($id);
    }
}