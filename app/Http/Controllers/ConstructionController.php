<?php

namespace App\Http\Controllers;

use App\Models\Construction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class ConstructionController extends Controller
{
    function get()
    {
        return response()->json(Auth::user()->constructions);
    }

    function add(Request $request)
    {
        $construction = $request->input('construction');
        $construction['user_id'] = Auth::user()->id;
        return response()->json(Construction::create($construction));
    }

    function update(Request $request, $id)
    {
        $construction = $request->input('construction');
		unset($construction['supplier']);
		unset($construction['updated_at']);
		unset($construction['created_at']);
		Construction::find($id)->update($construction);
    }

    function remove($id)
    {
        Construction::destroy($id);
    }
}