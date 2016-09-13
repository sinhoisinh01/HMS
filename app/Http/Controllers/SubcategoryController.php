<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class SubcategoryController extends Controller
{
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