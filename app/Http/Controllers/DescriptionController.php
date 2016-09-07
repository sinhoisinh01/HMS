<?php

namespace App\Http\Controllers;

use App\Models\Description;
use Illuminate\Http\Request;

class DescriptionController extends Controller
{
    function add(Request $request)
    {
        return Description::create(['sub-category_id' => $request->input('sub-category_id'),
            'work_id' => $request->input('work_id')]);
    }

    function update($id, Request $request)
    {
        Description::find($id)->update($request->input('description'));
    }

    function remove($id)
    {
        Description::destroy($id);
    }
}