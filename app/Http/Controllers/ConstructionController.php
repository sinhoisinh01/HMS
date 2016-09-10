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
    function get($id)
    {
        return response()->json(Construction::find($id));
    }
    function add(Request $request)
    {
        $construction = $request->input('construction');
        $construction['user_id'] = Auth::user()->id;
        return response()->json(Construction::create($construction));
    }

    function update(Request $request, $id)
    {
        Construction::find($id)->update($request->input('construction'));
    }

    function remove($id)
    {
        Construction::destroy($id);
    }
}