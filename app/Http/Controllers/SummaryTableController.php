<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ExportGetDataController;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class SummaryTableController extends Controller
{
    function get(Request $request)
    {
        $getDataController = new ExportGetDataController();
        //$summary = $getDataController->summaryTableData( $request->input('construction_id'), $request->input('category_id') );

        $summary = [
          "labourPrice" => 50000,
          "machinePrice" => 50000,
          "materialPrice" => 50000
        ];

        return response()->json($summary);
    }
}