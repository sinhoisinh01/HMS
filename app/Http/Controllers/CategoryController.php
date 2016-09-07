<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Construction;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    function getCategoriesByConstruction($construction_id)
    {
        return response()->json(Construction::find($construction_id)->categories);
    }

    function add(Request $request)
    {
        $category = Category::create(['construction_id' => $request->input('construction_id'), 'name' => $request->input('name')]);
		Subcategory::create(['category_id' => $category->id, 'name' => '']);
		return response()->json($category);
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