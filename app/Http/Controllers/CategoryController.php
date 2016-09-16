<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Construction;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class CategoryController extends Controller
{
    function get(Request $request)
    {
        $categories = Construction::find($request->input('construction_id'))->categories;
        foreach ($categories as $category) {
            unset($category->construction_id);
        }
        return response()->json($categories);
    }

    function add(Request $request)
    {
        return response()->json(Category::create($request->input('category')));
    }

    function update(Request $request, $id)
    {
        Category::find($id)->update($request->input('category'));
    }

    function remove($id)
    {
		Category::destroy($id);
    }
}