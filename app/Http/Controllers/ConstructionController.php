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
        return response()->json(Construction::create([
            'user_id' => Auth::user()->id,
            'name' => $request->input('name'),
            'supplier_id' => $request->input('supplier_id'),
            'address' => $request->input('address'),
            'investor' => $request->input('investor'),
            'contractor' => $request->input('contractor'),
            'type' => $request->input('type'),
            'design_type' => $request->input('design_type'),
            'level' => $request->input('level')
        ]));
    }

    function get($id)
    {
        return response()->json(Construction::find($id));
    }

    function update(Request $request, $id)
    {
        return response()->json(Construction::find($id)->update([
            'name' => $request->input('name'),
            'supplier_id' => $request->input('supplier_id'),
            'address' => $request->input('address'),
            'investor' => $request->input('investor'),
            'contractor' => $request->input('contractor'),
            'type' => $request->input('type'),
            'design_type' => $request->input('design_type'),
            'level' => $request->input('level')
        ]));
    }

    function remove($id)
    {
        Construction::destroy($id);
    }
}