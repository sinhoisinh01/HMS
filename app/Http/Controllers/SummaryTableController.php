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
        $summaryTable = $getDataController->summaryTableData( $request->input('construction_id'), $request->input('category_id') );

        $summary = [
          "labourPrice" => $summaryTable[1],
          "machinePrice" => $summaryTable[2],
          "materialPrice" => $summaryTable[0]
        ];

        return response()->json($summary);
    }
}