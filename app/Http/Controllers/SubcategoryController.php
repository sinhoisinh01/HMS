<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;

class SubcategoryController extends Controller
{
    function getSubcategoriesByCategory($category_id)
    {
        return response()->json(Category::find($category_id)->subcategories);
    }

    function add(Request $request)
    {
        return response()->json(Subcategory::create(['category_id' => $request->input('category_id'),
            'name' => $request->input('name')]));
    }

    function update(Request $request, $id)
    {
        Subcategory::find($id)->update(['name' => $request->input('name')]);
    }

    function remove($id)
    {
        Subcategory::destroy($id);
    }
}