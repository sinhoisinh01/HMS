<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class SupplierController extends Controller
{
    function get()
    {
        return response()->json(Supplier::whereIn('user_id', [1, Auth::user()->id])->get());
    }

	function add(Request $request)
	{
		$supplier = $request->input('supplier');
		$supplier['user_id'] = Auth::user()->id;
		return Supplier::create($supplier);
	}

    function update($id, Request $request)
	{
        Supplier::find($id)->update($request->input('supplier'));
	}

    function remove($id)
	{
		Supplier::destroy($id);
	}
}