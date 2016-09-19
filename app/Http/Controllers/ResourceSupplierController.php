<?php

namespace App\Http\Controllers;

use App\Models\ResourceSupplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class ResourceSupplierController extends Controller
{
    function get(Request $request)
    {
        return response()->json(ResourceSupplier::where('supplier_id', $request->input('supplier_id'))->get(['resource_id', 'price']));
    }

    function add(Request $request)
    {
        return response()->json(ResourceSupplier::create($request->input('resourceSupplier')));
    }

    function update($resource_id, $supplier_id, Request $request)
    {
        $resourceSupplier = ResourceSupplier::where('supplier_id', $supplier_id)
			->where('resource_id', $resource_id)
			->update($request->input('resourceSupplier'));
    }

    function remove($resource_id, $supplier_id)
    {
        ResourceSupplier::where('supplier_id', $supplier_id)
			->where('resource_id', $resource_id)->delete();
    }
}