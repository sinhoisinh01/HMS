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

    function add($construction_id)
    {
		$postdata = file_get_contents('php://input');
		$data = json_decode($postdata, true);
		print_r($data);
		$name = $data->name;
        if (Auth::user()->id === Construction::find($construction_id)->user_id)
            return response()->json(Category::create(['construction_id' => $construction_id, 'name' => $name]));
        return redirect('/index.html#/login');
    }
	function remove($construction_id, $category_id)
	{
		if (Auth::user()->id === Construction::find($construction_id)->user_id)
		{
			Category::find($category_id)->delete();
		}
        return redirect('/index.html#/login');
	}
}