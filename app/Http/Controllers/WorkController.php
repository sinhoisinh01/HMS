<?php

namespace App\Http\Controllers;

use App\Models\Work;

class WorkController extends Controller
{
    function getAll() {
        return response()->json(Work::all());
    }
}