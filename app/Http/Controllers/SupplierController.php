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

    function getConstructionSupplierID($construction_id)
    {
        return response()->json(Construction::find($construction_id)->supplier_id);
    }
}