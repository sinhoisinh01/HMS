<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\ResourceWork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class ResourceWorkController extends Controller
{
    function get(Request $request)
    {
        return response()->json(ResourceWork::join('works', 'work_id', '=', 'works.id')
		->where('works.construction_id', 1)
		->orWhere('works.construction_id', $request->input('construction_id'))
		->get(['resource_id','work_id','value']));
    }

    function add(Request $request)
    {
        return response()->json(ResourceWork::create($request->input('resourceWork')));
    }

    function update($resource_id, $work_id, Request $request)
    {
        ResourceWork::where('resource_id', $resource_id)
			->where('work_id', $work_id)
			->update($request->input('resourceWork'));
    }

    function remove($resource_id, $work_id)
    {
        ResourceWork::where('resource_id', $resource_id)
			->where('work_id', $work_id)->delete();
    }
}