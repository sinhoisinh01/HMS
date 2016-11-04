<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class PricesTableController extends Controller
{
    function get(Request $request)
    {
        $res = Subcategory::join('subcategory_work', 'subcategories.id', '=', 'subcategory_work.subcategory_id')
        ->join('works', 'subcategory_work.work_id', '=', 'works.id')
        ->join('resource_work', 'works.id', '=', 'resource_work.work_id')
        ->join('resources', 'resource_work.resource_id', '=', 'resources.id')
        ->join('construction_resource', 'resources.id', '=', 'construction_resource.resource_id')
        ->select('resource_work.resource_id', 'resources.code', 'resources.name', 'resources.unit', 
            DB::raw('SUM(subcategory_work.value) as value'), 'construction_resource.price as price')
        ->where('construction_resource.construction_id', $request->input('construction_id'))
        ->where('subcategories.category_id', $request->input('category_id'))
        ->groupBy('resource_work.resource_id')  
		->get();
        return response()->json($res);
    }

    function update($id, Request $request)
    {
		//ToDo
    }
}