<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryWork;
use Illuminate\Http\Request;

class CategoryWorkController extends Controller
{
    function getWorks($category_id)
    {
        return response()->json(CategoryWork::join('works', 'category_work.work_code', '=', 'works.code')
		->select('category_work.no', 'works.*', 'category_work.value')
		->where('category_id', $category_id)->get());
    }

    function add($category_id, $work_id)
    {
        return response()->json(Category::create(['category_id' => $category_id, 'work_id' => $work_id, 'value' => 0]));
    }

    function get($category_id, $work_id)
    {
        return response()->json(CategoryWork::where('category_id', $category_id)->where('work_id', $work_id)->first());
    }

    function update(Request $request, $category_id, $work_id)
    {
        CategoryWork::where('category_id', $category_id)->where('work_id', $work_id)->update(['value' => $request->input('value')]);
    }

    function remove($category_id, $work_id)
    {
        CategoryWork::where('category_id', $category_id)->where('work_id', $work_id)->delete();
    }
}