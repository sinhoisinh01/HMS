<?php

namespace App\Http\Controllers;

use App\Models\Work;
use Illuminate\Http\Request;

class WorkController extends Controller
{
    function getAll(Request $request)
    {
        return response()->json(
            Work::join('resource_work', 'resource_work.work_id', '=', 'works.id')
                ->join('resource_supplier', 'resource_supplier.resource_code', '=', 'resource_work.resource_code')
                ->where('supplier_id', $request->input('supplier_id'))->get()
                ->groupBy('id')
                ->transform(function ($work) {
                    $price = 0;
                    foreach ($work as $resource) {
                        $price += $resource->price * $resource->value;
                    }
                    $work[0]->price = $price;
                    return $work[0];
                })->values());
    }
}