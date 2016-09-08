<?php

namespace App\Http\Controllers;

use App\Models\CategoryWork;
use App\Models\Description;
use Illuminate\Http\Request;

class CategoryWorkController extends Controller
{
    function getWorks($subcategory_id)
    {
        $works = CategoryWork::join('works', 'category_work.work_id', '=', 'works.id')
            ->where('subcategory_id', $subcategory_id)->get();
        $descriptions = Description::where('subcategory_id', $subcategory_id)->get()
            ->groupBy('work_id')->toArray();
        foreach ($works as $work) {
            if (array_key_exists($work->code, $descriptions))
                $work->descriptions = $descriptions[$work->id];
        }
        return response()->json($works);
    }

    function add(Request $request)
    {
        if ($request->has('work_id')) //create
            CategoryWork::create(['subcategory_id' => $request->input('subcategory_id'),
                'work_id' => $request->input('work_id'),
                'no' => CategoryWork::where('subcategory_id', $request->input('subcategory_id'))->count() + 1,
                'value' => 0]);
        else { //replacement
            $toDelete = CategoryWork::where('subcategory_id', $request->input('subcategory_id'))
                ->where('work_id', $request->input('old_work_id'));
            CategoryWork::create(['subcategory_id' => $request->input('subcategory_id'),
                'work_id' => $request->input('new_work_id'),
                'no' => $toDelete->first()->no,
                'value' => 0]);
            $toDelete->delete();
        }
    }

    function update(Request $request, $category_id, $work_code)
    {
        CategoryWork::where('category_id', $category_id)->where('work_code', $work_code)
            ->update(['value' => $request->input('value'), 'no' => $request->input('no')]);
    }

    function remove($category_id, $work_code)
    {
        $toDelete = CategoryWork::where('category_id', $category_id)->where('work_code', $work_code);
        CategoryWork::where('category_id', $category_id)->where('no', '>', $toDelete->first()->no)->decrement('no');
        $toDelete->delete();
    }
}