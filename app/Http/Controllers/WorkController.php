<?php

namespace App\Http\Controllers;

use App\Models\Construction;
use App\Models\Work;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class WorkController extends Controller
{
    /*
     * Input: construction_id
     * Ouput: [{id, code, name, price, unit}]
     * Description: get all system works (work with construction_id = 1) by an construction_id
     */
    function get(Request $request)
    {
        // System works
        $work['system'] = Work::join('resource_work', 'resource_work.work_id', '=', 'works.id')
            ->join('construction_resource', 'construction_resource.resource_id', '=', 'resource_work.resource_id')
            ->where('construction_resource.construction_id', $request->input('construction_id'))
            ->where('works.construction_id', 1)
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
                    $work[0]->supplier_id, $work[0]->value);
                return $work[0];
            });
        // user-defined works
        $work['user_defined'] = Work::join('construction_resource_work', function ($join) use ($request) {
                $join->on('construction_resource_work.work_id', '=', 'works.id');
                $join->on('construction_resource_work.construction_id', '=', 'works.construction_id');
            })
            ->join('construction_resource', 'construction_resource.resource_id', '=', 'construction_resource_work.resource_id')
            ->where('construction_resource.construction_id', $request->input('construction_id'))
            ->where('works.construction_id', $request->input('construction_id'))
            ->get()
            ->groupBy('works.id')
            //laravel group by, not sql group by
            ->transform(function ($work) {
                $price = 0;
                foreach ($work as $resource) {
                    $price += $resource->price * $resource->value;
                }
                $work[0]->price = $price;
                unset($work[0]->document, $work[0]->construction_id, $work[0]->resource_id,
                    $work[0]->supplier_id, $work[0]->value);
                return $work[0];
            });
        $result = $work['system']->merge($work['user_defined']);
        return response()->json($result);
            
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