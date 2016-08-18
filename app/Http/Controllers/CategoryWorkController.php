<?php

namespace App\Http\Controllers;

use App\Models\CategoryWork;
use App\Models\Description;
use Illuminate\Http\Request;

class CategoryWorkController extends Controller
{
    function getWorks($category_id)
    {
        $works = CategoryWork::join('works', 'category_work.work_code', '=', 'works.code')
            ->where('category_id', $category_id)->get();
        $descriptions = Description::where('category_id', $category_id)->get()
            ->groupBy('work_code')->toArray();
        foreach ($works as $work) {
            if (array_key_exists($work->code, $descriptions))
                $work->descriptions = $descriptions[$work->code];
        }
        return response()->json($works);
    }

    function add(Request $request)
    {
        if ($request->has('work_code')) //create
            CategoryWork::create(['category_id' => $request->input('category_id'),
                'work_code' => $request->input('work_code'),
                'no' => CategoryWork::where('category_id', $request->input('category_id'))->count() + 1,
                'value' => 0]);
        else { //replacement
            $toDelete = CategoryWork::where('category_id', $request->input('category_id'))
                ->where('work_code', $request->input('old_work_code'));
            CategoryWork::create(['category_id' => $request->input('category_id'),
                'work_code' => $request->input('new_work_code'),
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