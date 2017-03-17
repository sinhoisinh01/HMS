<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;
use App\Http\Controllers\ExportGetDataController;
use Google_Client;
use Google_Service_Sheets;
use Google_Service_Sheets_Spreadsheet;
use Google_Service_Sheets_SpreadsheetProperties;
use Google_Service_Sheets_Request;
use Google_Service_Sheets_BatchUpdateSpreadsheetRequest;
use Google_Service_Sheets_ValueRange;

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

        // use exportGetDataController
        $exportGetData = new ExportGetDataController();

        /*$properties = new Google_Service_Sheets_SpreadsheetProperties();
        $properties->setTitle("Dự toán");

        $sheet = new Google_Service_Sheets_Spreadsheet();
        $sheet->setProperties($properties);

        $response = $service->spreadsheets->create($sheet);*/

        //$spreadsheetId = $response->spreadsheetId;
        $spreadsheetId = '1i-eEw77VhWq9X1ROcPdzmYUXC8noZyKFvpqsItnb3K4';

        /*Set Data for Spreadsheet*/
        /*$requests[] = new Google_Service_Sheets_Request(array(
		  'updateCells' => array(
		    "start" => array(
	          "sheetId" => 0,
	          "rowIndex" => 0,
	          "columnIndex" => 0
	        ),
	        "rows" => array(
	          array(
	            "values" => array(
	              array(
	                "userEnteredValue" => array("numberValue" => 1),
	                "userEnteredFormat" => array(
	                	"backgroundColor" => array("red" => 1)
            		)
	              ), 
	              array(
	                "userEnteredValue" => array("numberValue" => 2),
	                "userEnteredFormat" => array(
	                	"backgroundColor" => array("blue" => 1)
            		)
	              ), 
	              array(
	                "userEnteredValue" => array("numberValue" => 2),
	                "userEnteredFormat" => array(
	                	"backgroundColor" => array("green" => 1)
            		)
	              )
	            )
	          )
	        ),
	        "fields" => "userEnteredValue,userEnteredFormat.backgroundColor"
	  	   )
		));
		

		$batchUpdateRequest = new Google_Service_Sheets_BatchUpdateSpreadsheetRequest(array(
		  'requests' => $requests
		));

		$response = $service->spreadsheets->batchUpdate($spreadsheetId,
		    $batchUpdateRequest);*/
		
		$range = 'Sheet1!A1:K40';
		$values = $exportGetData->getEstimateTableData(1);
	  	$optParams = [];
	  	$optParams['valueInputOption'] = 'USER_ENTERED';
		$body = new Google_Service_Sheets_ValueRange( array(
  			'values' => $values
		) );
		$result = $service->spreadsheets_values->update($spreadsheetId, $range, $body, $optParams);

		
		var_dump( $result );
		//var_dump($test->estimateTable(1));
    }
}