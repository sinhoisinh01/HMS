<?php

namespace App\Http\Controllers;

use App\Models\Construction;
use App\Models\Work;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class WorkController extends Controller
{
    function get(Request $request)
    {
        return response()->json(
            Work::join('resource_work', 'resource_work.work_id', '=', 'works.id')
                ->join('resource_supplier', 'resource_supplier.resource_id', '=', 'resource_work.resource_id')
                ->where('supplier_id', Construction::find($request->input('construction_id'))->supplier_id)
				->whereIn('construction_id', [1, $request->input('construction_id')])
				->get()
                ->groupBy('id')
                //laravel group by, not sql group by
                ->transform(function ($work) {
                    $price = 0;
                    foreach ($work as $resource) {
                        $price += $resource->price * $resource->value;
                    }
                    $work[0]->price = $price;
                    unset($work[0]->document, $work[0]->construction_id, $work[0]->resource_id,
                        $work[0]->work_id, $work[0]->supplier_id, $work[0]->value);
                    return $work[0];
                })->values());
    }

    public function add(Request $request)
    {
        return Work::create($request->input('work'));
    }
	
	function update($id, Request $request)
	{
		Work::find($id)->update($request->input('work'));
	}
	
	function remove($id)
	{
		Work::destroy($id);
	}
}