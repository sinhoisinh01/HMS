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
        return response()->json(Construction::find($request->input('construction_id'))->categories);
    }

    function add(Request $request)
    {
        $category = Category::create(['construction_id' => $request->input('construction_id'), 'name' => $request->input('name')]);
        /* Subcategory::create(['category_id' => $category->id, 'name' => '']);
         * This request need to be send from the frond end
         * I know here it's more slow because you need to wait 2 round way but it's
         * more important to keep a RESTful style
        */
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