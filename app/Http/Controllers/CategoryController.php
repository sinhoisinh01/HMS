<?php

namespace App\Http\Controllers;

use App\Category;
use App\Construction;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    function get($construction_id)
    {
        if (Auth::user()->id === Construction::find($construction_id)->user_id)
            return response()->json(Construction::find($construction_id)->categories);
        return redirect('/index.html#/login');
    }

    function getName($construction_id, $category_id)
    {
        //return response()->json(Category::where('construction_id'=>$construction_id,'id'=>$category_id)->name);
    }
     
    function add($construction_id)
    {
        if (Auth::user()->id === Construction::find($construction_id)->user_id)
            return response()->json(Category::create(['construction_id' => $construction_id, 'name' => json_decode(file_get_contents('php://input'))->name]));
        return redirect('/index.html#/login');
    }
	
	function update($construction_id, $category_id)
    {
        if (Auth::user()->id === Construction::find($construction_id)->user_id) {
            Category::find($category_id)->update(['name' => json_decode(file_get_contents('php://input'))->name]);
        } else
            return redirect('/index.html#/login');
    }

    function remove($construction_id, $category_id)
    {
        if (Auth::user()->id === Construction::find($construction_id)->user_id) {
            Category::find($category_id)->delete();
        } else
            return redirect('/index.html#/login');
    }
}