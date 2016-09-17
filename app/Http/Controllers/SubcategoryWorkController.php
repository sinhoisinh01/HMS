<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use App\Models\SubcategoryWork;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class SubcategoryWorkController extends Controller
{
    function get(Request $request)
    {
        $categoryWorks = Subcategory::where('category_id', $request->input('category_id'))
            ->with(['subcategoryWorks', 'subcategoryWorks.descriptions'])
            ->select(['id', 'name', 'no'])
            ->get();
        // Don't succeed to remove subcategory_id in subcategory_works and subcategoryWork_id in descriptions
        // use select inside the with return an empty array
        return response()->json($categoryWorks);
    }

    function add(Request $request)
    {
        $subcategoryWork = $request->input('subcategoryWork');
        /*Doesn't work, don't know why
         * SubcategoryWork::where('subcategory_id', $subcategoryWork->subcategory_id)
            ->where('no', '>=', $subcategoryWork->no)
            ->increment('no');*/
        return response()->json(SubcategoryWork::create($subcategoryWork));
    }

    function update(Request $request, $category_id, $work_code)
    {
        SubcategoryWork::where('category_id', $category_id)->where('work_code', $work_code)
            ->update(['value' => $request->input('value'), 'no' => $request->input('no')]);
    }

    function remove($category_id, $work_code)
    {
        $toDelete = SubcategoryWork::where('category_id', $category_id)->where('work_code', $work_code);
        SubcategoryWork::where('category_id', $category_id)->where('no', '>', $toDelete->first()->no)->decrement('no');
        $toDelete->delete();
    }
}