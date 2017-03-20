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
        $client = $this->getClient();

		$service = new Google_Service_Sheets($client);

		$requestBody = new Google_Service_Sheets_Spreadsheet();

		//$optParams = $this->getRequestBody();

		$response = $service->spreadsheets->create($requestBody);

		echo '<pre>', var_export($requestBody, true), '</pre>', "\n";
	}

	function export(Request $request) 
	{
		$client = $this->getClient();
        $service = new Google_Service_Sheets($client);
        $exportGetData = new ExportGetDataController();
		$spreadsheetId = $this->createSpreadsheet( $service );
       	//$spreadsheetId = '14K326ocE-Gv0O_FOF_Tb74o-4CwiMUNdErVNr2S91v8';

        $construction_id = $request->input('construction_id');
        $category_id = $request->input('category_id');

        $result = $this->setSpreadsheetFormat( $service, $spreadsheetId );

		$data = $exportGetData->getSummarySheetData( $construction_id, $category_id );
		$result = $this->setDataForSheet( $service, $spreadsheetId, "CP Xay lap", $data );
		var_dump( $result );
		

		$data = $exportGetData->getEstimateSheetData( $construction_id, $category_id );
		$result = $this->setDataForSheet( $service, $spreadsheetId, "Du toan chi tiet", $data );
		var_dump( $result );

		$costTable = $exportGetData->get2CostSheetData( $construction_id, $category_id );
		
	  	$data = $costTable["labourMachine"];
		$result = $this->setDataForSheet( $service, $spreadsheetId, "Gia NC,CM", $data );
		var_dump( $result );
		
	  	$data = $costTable["material"];
		$result = $this->setDataForSheet( $service, $spreadsheetId, "Gia VL", $data );
		var_dump( $result );
    }

    /**
   * Get Google Client from Auth, returning the Authenticated Google Client
   *
   * @return GoogleClient $client
   */
    private function getClient() {
    	$client = new Google_Client();
        $client->setClientId(env('APP_CLIENT_ID'));
        $client->setClientSecret(env('APP_CLIENT_SECRET'));
        $client->refreshToken(Auth::user()->refresh_token);
        return $client;
    }

    /**
   * Creates a spreadsheet, returning the newly created spreadsheetId.
   *
   * @param Google_Service_Sheets $service
   * @return String $spreadsheetId
   */
    private function createSpreadsheet( $service ) {
    	$properties = new Google_Service_Sheets_SpreadsheetProperties();
        $properties->setTitle("Dự toán");

        $sheet = new Google_Service_Sheets_Spreadsheet();
        $sheet->setProperties($properties);

        $response = $service->spreadsheets->create($sheet);

        return $response->spreadsheetId;
    }

    private function setSpreadsheetFormat( $service, $spreadsheetId ) {
    	$requests = $this->getFormatData();

		$requestBody = new Google_Service_Sheets_BatchUpdateSpreadsheetRequest();
		$requestBody->setRequests($requests);

		$response = $service->spreadsheets->batchUpdate($spreadsheetId, $requestBody);

    	//echo '<pre>', var_export($requestBody, true), '</pre>', "\n";
    }

    /**
   * Set data for a $sheetName, returning the an instance of UpdateValuesResponse.
   *
   * @param Google_Service_Sheets $service
   * @param String $spreadsheetId
   * @param String $sheetName
   * @param Multidimensional Indexed Array $data
   * @return UpdateValuesResponse sheet
   */
    private function setDataForSheet( $service, $spreadsheetId, $sheetName, $data ) {
    	$range = "'" . $sheetName . "'!A1:K500";
	  	$optParams = [];
	  	$optParams['valueInputOption'] = 'USER_ENTERED';
		$body = new Google_Service_Sheets_ValueRange( array(
  			'values' => $data
		) );
		return $service->spreadsheets_values->update($spreadsheetId, $range, $body, $optParams);
    } 

     /**
   * Get data for a Google Spreadsheet format, returning an Associative array like Google Request.
   * Link: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
   *
   * @return Associative array
   */
    private function getFormatData() {
    	$json_string = '{
		  "requests": [
		    {
		      "addSheet": {
		        "properties": {
		          "sheetId": 1,
		          "index": 0,
		          "title": "CP Xay lap"
		        }
		      }
		    },
		    {
		      "addSheet": {
		        "properties": {
		          "sheetId": 2,
		          "index": 1,
		          "title": "Du toan chi tiet"
		        }
		      }
		    },
		    {
		      "addSheet": {
		        "properties": {
		          "sheetId": 3,
		          "index": 2,
		          "title": "Gia NC,CM"
		        }
		      }
		    },
		    {
		      "addSheet": {
		        "properties": {
		          "sheetId": 4,
		          "index": 3,
		          "title": "Gia VL"
		        }
		      }
		    },
		    {
		      "deleteSheet": {
		        "sheetId": 0
		      }
		    }
		  ]
		}';
		return json_decode($json_string, true)["requests"];
    }
}