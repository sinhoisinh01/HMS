<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class SupplierController extends Controller
{
    function get()
    {
        return response()->json(Supplier::whereIn('user_id', [1, Auth::user()->id])->get());
    }
}