<?php

namespace App\Http\Controllers;

use App\Category;
use App\Construction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    function getAll(Request $request)
    {
        if (Auth::user()->id === Construction::find($request->input('construction_id'))->user_id)
            return response()->json(Construction::find($request->input('construction_id'))->categories);
        return redirect('/index.html#/login');
    }

    function add(Request $request)
    {
        if (Auth::user()->id === Construction::find($request->input('construction_id'))->user_id)
            return response()->json(Category::create(['construction_id' => $request->input('construction_id'), 'name' => $request->input('name')]));
        return redirect('/index.html#/login');
    }

    function get($category_id)
    {
        return response()->json(Category::find($category_id));
    }
	
	function update(Request $request, $category_id)
    {
        if (Auth::user()->id === Category::find($category_id)->construction->user_id) {
            Category::find($category_id)->update(['name' => $request->input('name')]);
        } else
            return redirect('/index.html#/login');
    }

    function remove($category_id)
    {
        if (Auth::user()->id === Category::find($category_id)->construction->user_id) {
            Category::destroy($category_id);
        } else
            return redirect('/index.html#/login');
    }
}