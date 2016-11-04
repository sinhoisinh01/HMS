<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use App\Models\SubcategoryWork;
use App\Models\Work;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class AnalysisTableController extends Controller
{
    function get(Request $request)
    {
        $categoryWorks = Subcategory::where('category_id', $request->input('category_id'))
            ->with(['subcategoryWorks.work', 'subcategoryWorks.work.resource_work', 'subcategoryWorks.work.resource_work.resource', 'subcategoryWorks.work.resource_work.resource.construction_resource'])
			->get();
        return response()->json($categoryWorks);
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
        //ToDo
    }
}