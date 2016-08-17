<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Description;

class DescriptionController extends Controller
{
    function add(Request $request)
    {
		return Description::create($request->input('description'));
    }

    function update(Request $request, $category_id, $work_code)
    {
		
    }

    function remove($category_id, $work_code, $content)
    {
        return Description::where('category_id', $category_id)->where('work_code', $work_code)
			->where('content', $content)->delete();
    }

    function replace($category_id, $old_work_code, $new_work_code)
    {
        
    }
}