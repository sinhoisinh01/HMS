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

    function add($construction_id, $name)
    {
        if (Auth::user()->id === Construction::find($construction_id)->user_id)
            return response()->json(Category::create(['construction_id' => $construction_id, 'name' => $name]));
        return redirect('/index.html#/login');
    }
}