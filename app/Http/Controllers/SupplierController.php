<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\Construction;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    function getAll()
    {
        return response()->json(Supplier::get());
    }

    function getConstructionSupplier($construction_id)
    {
        return response()->json(Construction::find($construction_id));
    }

    function changeSupplier($construction_id, $supplier_id)
    {
        Construction::where('id', $construction_id)->update(['supplier_id' => $supplier_id]);
    }
}