<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Description;
use App\Models\SubcategoryWork;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class SubcategoryWorkController extends Controller
{
    function get(Request $request)
    {
        $subcategories = Category::find($request->input('category_id'))->subcategories;
        $subcategoryWorks = Category::find($request->input('category_id'))->subcategoryWorks;
        /*SubcategoryWork::join('subcategories', 'subcategory_work.subcategory_id', '=', 'subcategories.id')
        ->join('works', 'subcategory_work.work_id', '=', 'works.id')
        ->where('category_id', $request->input('category_id'))->get();*/
        $descriptions = Description::join('subcategories', 'descriptions.subcategory_id', '=', 'subcategories.id')
            ->where('category_id', $request->input('category_id'))->get();
        $subcategories->transform(function ($subcategory) use ($subcategoryWorks, $descriptions) {
            $subcategory->works = $subcategoryWorks->where('subcategory_id', $subcategory->id);
			$subcategory->works->transform(function ($work) use ($subcategory, $descriptions) {
				$work->descriptions = $descriptions->where('work_id', $work->id)
					->where('subcategory_id', $subcategory->id);
				return $work;
			});
			return $subcategory;
		});
        return response()->json($subcategories);
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