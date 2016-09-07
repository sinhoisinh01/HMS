<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Construction;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    function getConstructionCategories($construction_id)
    {
        return response()->json(Construction::find($construction_id)->categories);
    }

    function add(Request $request)
    {
        return response()->json(Category::create(['construction_id' => $request->input('construction_id'),
            'name' => $request->input('name')]));
    }

    function get($id)
    {
        return response()->json(Category::find($id));
    }

    function update(Request $request, $id)
    {
        Category::find($id)->update(['name' => $request->input('name')]);
    }

    function remove($id)
    {
        Category::destroy($id);
    }
}