<?php

namespace App\Http\Controllers;

use App\Models\Description;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class DescriptionController extends Controller
{
    function add(Request $request)
    {
        Description::where('subcategoryWork_id', $request->input('description')['subcategoryWork_id'])
		->where('no', '>=', $request->input('description')['no'])->increment('no');
		return Description::create($request->input('description'));
    }

    function update($id, Request $request)
    {
        Description::find($id)->update($request->input('description'));
    }

    function remove($id)
    {
        $toDelete = Description::find($id);
		Description::where('subcategoryWork_id', $toDelete->subcategoryWork_id)
		->where('no', '>', $toDelete->no)->decrement('no');
		Description::destroy($id);
    }
}