<?php

namespace App\Http\Controllers;

use App\Models\Construction;
use App\Models\ConstructionResource;
use App\Models\ResourceSupplier;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class ConstructionController extends Controller
{
    function get()
    {
        return response()->json(Auth::user()->constructions);
    }

    function add(Request $request)
    {
        $cons = $request->input('construction');
        $cons['user_id'] = Auth::user()->id;
        $constructions = Construction::create($cons);
        $construction = $constructions->get()->last();
        $construction_resource = ResourceSupplier::where('supplier_id', $construction->toArray()['supplier_id'])
        ->get(['resource_id', 'price']);
        $construction_resource->transform(function ($item, $key) use ($construction) {
            $item['construction_id'] = $construction->toArray()['id'];
            return $item;
        });
        ConstructionResource::insert($construction_resource->toArray());
        return response()->json($constructions);
    }

    function update($id, Request $request)
    {
        $input = $request->input('construction');
		if(isset($input['supplier']))
			unset($input['supplier']);
		if(isset($input['updated_at']))
			unset($input['updated_at']);
		if(isset($input['created_at']))
			unset($input['created_at']);
		$construction = Construction::find($id);

        // if user change supplier, delete old construction_resource then insert new construction_resource
        if ($input['supplier_id'] != $construction->get('supplier_id')) {
            $construction_resource = ResourceSupplier::where('supplier_id', $input['supplier_id'])
            ->get(['resource_id', 'price']);
            $construction_resource->transform(function ($item, $key) use ($input) {
                $item['construction_id'] = $input->toArray()['id'];
                return $item;
            });
            ConstructionResource::where('construction_id', $id)->forceDelete();
            ConstructionResource::insert($construction_resource->toArray());
        }
        $construction->update($input);
    }

    function remove($id)
    {
        Construction::destroy($id);
        ConstructionResource::where('construction_id', $id)->forceDelete();
    }
}