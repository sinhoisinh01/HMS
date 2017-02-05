<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\ConstructionResourceWork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class ConstructionResourceWorkController extends Controller
{

    function add(Request $request)
    {
        return response()->json(ConstructionResourceWork::create($request->input('constructionResourceWork')));
    }

    function update($resource_id, $work_id, Request $request)
    {
        //ToDo
    }

    function remove($resource_id, $work_id)
    {
        //ToDo
    }
}