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
       	//$spreadsheetId = '1EwQGs5_bE6x0CU8JonmoSNrAqmx8incuk8o-g4fpB-4';

        $construction_id = $request->input('construction_id');
        $category_id = $request->input('category_id');

        $this->setSpreadsheetFormat( $service, $spreadsheetId );

		$data = $exportGetData->getSummarySheetData( $construction_id, $category_id );
		$this->setDataForSheet( $service, $spreadsheetId, "CP Xay lap", $data );				

		$data = $exportGetData->getEstimateSheetData( $construction_id, $category_id );
		$this->setDataForSheet( $service, $spreadsheetId, "Du toan chi tiet", $data );
		
		$costTable = $exportGetData->get2CostSheetData( $construction_id, $category_id );
		
	  	$data = $costTable["labourMachine"];
		$this->setDataForSheet( $service, $spreadsheetId, "Gia NC,CM", $data );
		
	  	$data = $costTable["material"];
		$result = $this->setDataForSheet( $service, $spreadsheetId, "Gia VL", $data );
		
		return response()->json($result["spreadsheetId"]);
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
    	$this->sendFormatRequest( $service, $spreadsheetId, $this->getSheetsFormat() );
    	$this->sendFormatRequest( $service, $spreadsheetId, $this->getSpreadsheetsFormat() );
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
   * Send format request to format spreadsheet
   */
    private function sendFormatRequest( $service, $spreadsheetId, $format_array ) {
    	$requests = $format_array;

		$requestBody = new Google_Service_Sheets_BatchUpdateSpreadsheetRequest();
		$requestBody->setRequests($requests);

		$response = $service->spreadsheets->batchUpdate($spreadsheetId, $requestBody);

    	//echo '<pre>', var_export($requestBody, true), '</pre>', "\n";
    }

     /**
   * Get request array for adding sheets
   *
   * @return Associative array
   */
    private function getSheetsFormat() {
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

    /**
   * Get request array for all spreadsheet format
   *
   * @return Associative array
   */
    private function getSpreadsheetsFormat() {
    	$json_string = '{
		  "requests": [
		    {
		      "mergeCells": {
		        "range": {
		          "sheetId": 1,
		          "startColumnIndex": 0,
		          "endColumnIndex": 6,
		          "startRowIndex": 0,
		          "endRowIndex": 6
		        },
		        "mergeType": "MERGE_ROWS"
		      }
		    },
		    {
		      "mergeCells": {
		        "range": {
		          "sheetId": 2,
		          "startColumnIndex": 0,
		          "endColumnIndex": 11,
		          "startRowIndex": 0,
		          "endRowIndex": 6
		        },
		        "mergeType": "MERGE_ROWS"
		      }
		    },
		    {
		      "mergeCells": {
		        "range": {
		          "sheetId": 3,
		          "startColumnIndex": 0,
		          "endColumnIndex": 4,
		          "startRowIndex": 0,
		          "endRowIndex": 6
		        },
		        "mergeType": "MERGE_ROWS"
		      }
		    },
		    {
		      "mergeCells": {
		        "range": {
		          "sheetId": 4,
		          "startColumnIndex": 0,
		          "endColumnIndex": 4,
		          "startRowIndex": 0,
		          "endRowIndex": 6
		        },
		        "mergeType": "MERGE_ROWS"
		      }
		    },
		    {
		      "updateSpreadsheetProperties": {
		        "properties": {
		          "defaultFormat": {
		            "wrapStrategy": "WRAP",
		            "numberFormat": {
		              "type": "NUMBER"
		            },
		            "verticalAlignment": "MIDDLE",
		            "textFormat": {
		              "fontFamily": "Arial",
		              "fontSize": 12
		            }
		          },
      			  "title": "Dự toán"
		        },
		        "fields": "*"
		      }
		    }
		  ]
		}';
		return json_decode($json_string, true)["requests"];
    }
}