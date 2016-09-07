<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Work;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    function getSubCategoriesByCategory($category_id)
    {
        return response()->json(Category::find($category_id)->sub-categories);
    }

    function add(Request $request)
    {
        return response()->json(SubCategory::create(['category_id' => $request->input('category_id'),
            'name' => $request->input('name')]));
    }

    function update(Request $request, $id)
    {
        SubCategory::find($id)->update(['name' => $request->input('name')]);
    }

    function remove($id)
    {
        SubCategory::destroy($id);
    }
}