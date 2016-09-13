<?php

namespace App\Http\Controllers;

use App\Models\Description;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class DescriptionController extends Controller
{
    function add(Request $request)
    {
        return Description::create($request->input('description'));
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