<?php

namespace App\Http\Controllers;

use App\Models\Supplier;

class SupplierController extends Controller
{
    function getAll()
    {
        return response()->json(Supplier::all());
    }
}