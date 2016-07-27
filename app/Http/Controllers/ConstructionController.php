<?php

namespace App\Http\Controllers;

use App\Construction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConstructionController extends Controller
{
    function getRecent()
    {
        return response()->json(Auth::user()->constructions()->orderBy('updated_at', 'DESC')->limit(4)->get());
    }

    function getAll()
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

    function get($construction_id)
    {
        if (Auth::user()->id === Construction::find($construction_id)->user_id)
            return response()->json(Construction::find($construction_id));
        return redirect('/index.html#/login');
    }

    function update(Request $request, $construction_id)
    {
        if (Auth::user()->id === Construction::find($construction_id)->user_id)
            return response()->json(Construction::find($construction_id)->update([
                'name' => $request->input('name'),
                'supplier_id' => $request->input('supplier_id'),
                'address' => $request->input('address'),
                'investor' => $request->input('investor'),
                'contractor' => $request->input('contractor'),
                'type' => $request->input('type'),
                'design_type' => $request->input('design_type'),
                'level' => $request->input('level')
            ]));
        return redirect('/index.html#/login');
    }

    function remove($construction_id)
    {
        if (Auth::user()->id === Construction::find($construction_id)->user_id)
            Construction::destroy($construction_id);
        return redirect('/index.html#/login');
    }
}