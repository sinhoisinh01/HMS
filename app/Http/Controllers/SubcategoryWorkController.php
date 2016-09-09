<?php

namespace App\Http\Controllers;

use App\Models\SubcategoryWork;
use Illuminate\Http\Request;

class SubcategoryWorkController extends Controller
{
    function getWorks($category_id)
    {
        $works = SubcategoryWork::join('works', 'category_work.work_id', '=', 'works.id')
            ->join('subcategories', 'subcategories.id', '=', 'category_work.subcategory_id')
            ->join('descriptions', function ($join) {
                //ToDO
            })
            ->where('category_id', $category_id)->get()
            ->groupBy('work_id')
            ->groupBy('subcategory_id');
        return response()->json($works);
    }

    function add(Request $request)
    {
        if ($request->has('work_id')) //create
            SubcategoryWork::create(['subcategory_id' => $request->input('subcategory_id'),
                'work_id' => $request->input('work_id'),
                'no' => SubcategoryWork::where('subcategory_id', $request->input('subcategory_id'))->count() + 1,
                'value' => 0]);
        else { //replacement
            $toDelete = SubcategoryWork::where('subcategory_id', $request->input('subcategory_id'))
                ->where('work_id', $request->input('old_work_id'));
            SubcategoryWork::create(['subcategory_id' => $request->input('subcategory_id'),
                'work_id' => $request->input('new_work_id'),
                'no' => $toDelete->first()->no,
                'value' => 0]);
            $toDelete->delete();
        }
    }

    function update(Request $request, $category_id, $work_code)
    {
        SubcategoryWork::where('category_id', $category_id)->where('work_code', $work_code)
            ->update(['value' => $request->input('value'), 'no' => $request->input('no')]);
    }

    function remove($category_id, $work_code)
    {
        $toDelete = SubcategoryWork::where('category_id', $category_id)->where('work_code', $work_code);
        SubcategoryWork::where('category_id', $category_id)->where('no', '>', $toDelete->first()->no)->decrement('no');
        $toDelete->delete();
    }
}