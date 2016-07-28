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
        return response()->json(Category::create(['construction_id' => $request->input('construction_id'), 'name' => $request->input('name')]));
    }

    function get($category_id)
    {
        return response()->json(Category::find($category_id));
    }

    function update(Request $request, $category_id)
    {
        Category::find($category_id)->update(['name' => $request->input('name')]);
    }

    function remove($category_id)
    {
        Category::destroy($category_id);
    }
}