<?php

namespace App\Http\Controllers;

use App\Models\Description;
use Illuminate\Http\Request;

class DescriptionController extends Controller
{
    function add(Request $request)
    {
        return Description::create(['category_id' => $request->input('category_id'),
            'work_code' => $request->input('work_code')]);
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