<?php

namespace App\Http\Controllers;

use App\Models\Construction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConstructionController extends Controller
{
    function getUserConstructions()
    {
        return response()->json(Auth::user()->constructions);
    }

    function add(Request $request)
    {
        $construction = $request->input('construction');
        $construction['user_id'] = Auth::user()->id;
        return response()->json(Construction::create($construction));
    }

    function get($id)
    {
        return response()->json(Construction::find($id));
    }

    function update(Request $request, $id)
    {
        Construction::find($id)->fill(json_decode($request->input('construction'), true))->save();
    }

    function remove($id)
    {
        Construction::destroy($id);
    }
}