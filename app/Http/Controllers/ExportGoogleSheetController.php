<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;
use Google_Client;
use Google_Service_Sheets;
use Google_Service_Sheets_Spreadsheet;
use Google_Service_Sheets_SpreadsheetProperties;

class ExportGoogleSheetController extends Controller
{
	function get()
    {
        $client = new Google_Client();
        $client->setClientId(env('APP_CLIENT_ID'));
        $client->setClientSecret(env('APP_CLIENT_SECRET'));
        $client->refreshToken(Auth::user()->refresh_token);
		
        //var_dump($client);
        $service = new Google_Service_Sheets($client);
        $spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
		$range = 'Class Data!A2:E';
		$response = $service->spreadsheets_values->get($spreadsheetId, $range);
		$values = $response->getValues();

		/*if (count($values) == 0) {
		  print "No data found.\n";
		} else {
		  print "Name, Major:\n";
		  foreach ($values as $row) {
		    // Print columns A and E, which correspond to indices 0 and 4.
		    printf("%s, %s\n", $row[0], $row[4]);
		  }
		}*/

		var_dump($response);
	}

	function create() 
	{
		$client = new Google_Client();
        $client->setClientId(env('APP_CLIENT_ID'));
        $client->setClientSecret(env('APP_CLIENT_SECRET'));
        $client->refreshToken(Auth::user()->refresh_token);
        $service = new Google_Service_Sheets($client);

        $properties = new Google_Service_Sheets_SpreadsheetProperties();
        $properties->setTitle("Dự toán");

        $sheet = new Google_Service_Sheets_Spreadsheet();
        $sheet->setProperties($properties);

        $response = $service->spreadsheets->create($sheet);

        $spreadsheetId = $response->spreadsheetId;

        $requests[] = new Google_Service_Sheets_Request(array(
		  'updateCells' => array(
		    "start" => array(
	          "sheetId" => 0,
	          "rowIndex" => 0,
	          "columnIndex" => 0
	        ),
		  )
		));
    }
}