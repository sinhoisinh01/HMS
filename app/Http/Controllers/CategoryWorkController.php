<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryWork;
use Illuminate\Http\Request;

class CategoryWorkController extends Controller
{
    function getWorks($category_id)
    {
        return response()->json(CategoryWork::where('category_id', $category_id)->get());
    }

    function add($category_id, $work_code)
    {
        $no = 1;
        $allCategoryWorks = CategoryWork::where('category_id', $category_id)->get();
        foreach($allCategoryWorks as $a)
        {
            if($a['work_code'] == $work_code)
            {
                CategoryWork::where('category_id', $category_id)->where('work_code', $work_code)->increment('amount');
                return 1;
                // if work has already existed, increase the amount by 1 then break;
            }    
            if($no != $a['no'])
                break;
            else $no++;
            // find the proper order number for work if it does not exist
        }
        return response()->json(
            CategoryWork::create(['category_id' => $category_id, 'work_code' => $work_code, 'no' => $no, 'amount' => 0])
        );
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