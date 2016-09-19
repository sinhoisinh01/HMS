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
        return response()->json($categoryWorks);
    }

    function add(Request $request)
    {
        $subcategoryWork = $request->input('subcategoryWork');
        SubcategoryWork::where('subcategory_id', $subcategoryWork['subcategory_id'])
            ->where('no', '>=', $subcategoryWork['no'])
            ->increment('no');
        return response()->json(SubcategoryWork::create($subcategoryWork));
    }

    function update($id, Request $request)
    {
		SubcategoryWork::find($id)->update($request->input('subcategoryWork'));
    }

    function remove($id)
    {
        $toDelete = SubcategoryWork::find($id);
		SubcategoryWork::where('subcategory_id', $toDelete->subcategory_id)
		->where('no', '>', $toDelete->no)->decrement('no');
		SubcategoryWork::destroy($id);
    }
}