<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class SubcategoryController extends Controller
{
    function add(Request $request)
    {
        Subcategory::where('category_id', $request->input('subcategory')['category_id'])
		->where('no', '>=', $request->input('subcategory')['no'])
		->increment('no');
		return response()->json(Subcategory::create($request->input('subcategory')));
    }

    function update(Request $request, $id)
    {
        Subcategory::find($id)->update($request->input('subcategory'));
    }

    function remove($id)
    {
		$toDelete = Subcategory::find($id);
		Subcategory::where('category_id', $toDelete->category_id)
		->where('no', '>', $toDelete->no)->decrement('no');
		Subcategory::destroy($id);
    }
}