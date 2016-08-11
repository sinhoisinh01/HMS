<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryWork;
use Illuminate\Http\Request;

class CategoryWorkController extends Controller
{
    function getWorks($category_id)
    {
        $works = CategoryWork::join('works', 'category_work.work_code', '=', 'works.code')
            ->where('category_id', $category_id)
            ->orderBy('work_code')->get();
        $prices = CategoryWork::join('works', 'category_work.work_code', '=', 'works.code')
            ->join('resource_work', 'resource_work.work_code', '=', 'category_work.work_code')
            ->join('resource_supplier', 'resource_supplier.resource_code', '=', 'resource_work.resource_code')
            ->where('supplier_id', Category::find($category_id)->construction->supplier_id)
            ->where('category_id', $category_id)->get()
            ->groupBy('work_code')
            ->transform(function ($work) {
                return $work->transform(function ($resource) {
                    return $resource->price = $resource->price * $resource->amount;
                })->sum();
            });
        $works = $works->zip($prices)
            ->transform(function ($work) {
                $work[0]->price = $work[1];
                return $work[0];
            });
        return response()->json($works);
    }

    function add($category_id, $work_code)
    {
        CategoryWork::create(['category_id' => $category_id, 'work_code' => $work_code,
            'no' => CategoryWork::where('category_id', $category_id)->count() + 1, 'value' => 0]);
        return($this->get($category_id, $work_code));
    }

    function get($category_id, $work_code)
    {
        $categoryWork = CategoryWork::join('works', 'category_work.work_code', '=', 'works.code')
            ->where('category_id', $category_id)->where('work_code', $work_code)->first();
        $price = CategoryWork::join('works', 'category_work.work_code', '=', 'works.code')
            ->join('resource_work', 'resource_work.work_code', '=', 'category_work.work_code')
            ->join('resource_supplier', 'resource_supplier.resource_code', '=', 'resource_work.resource_code')
            ->where('supplier_id', Category::find($category_id)->construction->supplier_id)
            ->where('category_id', $category_id)
            ->where('category_work.work_code', $work_code)->get()
            ->transform(function ($resource) {
                return $resource->price = $resource->price * $resource->amount;
            })->sum();
        $categoryWork->price = $price;
        return response()->json($categoryWork);
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

    function replace($category_id, $old_work_code, $new_work_code)
    {
        $toDelete = CategoryWork::where('category_id', $category_id)->where('work_code', $old_work_code);
        CategoryWork::create(['category_id' => $category_id, 'work_code' => $new_work_code, 'no' => $toDelete->first()->no, 'value' => 0]);
        $toDelete->delete();
        return($this->get($category_id, $new_work_code));
    }
}