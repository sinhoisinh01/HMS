<?php

namespace App\Http\Controllers;

use App\Models\ConstructionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class ConstructionResourceController extends Controller
{
    function add(Request $request)
    {
        ConstructionResource::create($request->input('constructionResource'));
    }

    function update($construction_id, $resource_id, Request $request)
    {
        ConstructionResource::where('construction_id', $construction_id)
			->where('resource_id', $resource_id)
			->update($request->input('constructionResource'));
    }

    function remove($construction_id, $resource_id)
    {
        ConstructionResource::where('construction_id', $construction_id)
			->where('resource_id', $resource_id)->delete();
    }
}