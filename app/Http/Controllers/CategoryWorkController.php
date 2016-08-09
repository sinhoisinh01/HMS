<?php

namespace App\Http\Controllers;

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

    function add($category_id, $work_code)
    {
        CategoryWork::create(['category_id' => $category_id, 'work_code' => $work_code, 'no' => 0, 'value' => 0]);
    }

    function get($category_id, $work_code)
    {
        return response()->json(CategoryWork::where('category_id', $category_id)->where('work_code', $work_code)->first());
    }

    function update(Request $request, $category_id, $work_code)
    {
        CategoryWork::where('category_id', $category_id)->where('work_code', $work_code)->update(['value' => $request->input('value')]);
    }

    function remove($category_id, $work_code)
    {
        CategoryWork::where('category_id', $category_id)->where('work_code', $work_code)->delete();
    }
}