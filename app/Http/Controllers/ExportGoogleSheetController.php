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
        /*$service = new Google_Service_Sheets($client);
        $spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
		$range = 'Class Data!A2:E';
		$response = $service->spreadsheets_values->get($spreadsheetId, $range);
		$values = $response->getValues();*/



		/*if (count($values) == 0) {
		  print "No data found.\n";
		} else {
		  print "Name, Major:\n";
		  foreach ($values as $row) {
		    // Print columns A and E, which correspond to indices 0 and 4.
		    printf("%s, %s\n", $row[0], $row[4]);
		  }
		}*/

		$service = new Google_Service_Sheets($client);

		$requestBody = new Google_Service_Sheets_Spreadsheet();

		//$optParams = $this->getRequestBody();

		$response = $service->spreadsheets->create($requestBody);

		echo '<pre>', var_export($requestBody, true), '</pre>', "\n";
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
        $spreadsheetId = '1X_g7bTQvHQPPQOl-cnG28DoffXdUfgGcID2AmqzYtuI';

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
		$values = $exportGetData->getSummaryTableData(2,1);
	  	$optParams = [];
	  	$optParams['valueInputOption'] = 'USER_ENTERED';
		$body = new Google_Service_Sheets_ValueRange( array(
  			'values' => $values
		) );
		$result = $service->spreadsheets_values->update($spreadsheetId, $range, $body, $optParams);

		var_dump( $result );
		

		$range = 'Sheet2!A1:K100';
		$values = $exportGetData->estimateTableFormat(1);
	  	$optParams = [];
	  	$optParams['valueInputOption'] = 'USER_ENTERED';
		$body = new Google_Service_Sheets_ValueRange( array(
  			'values' => $values
		) );
		$result = $service->spreadsheets_values->update($spreadsheetId, $range, $body, $optParams);

		
		var_dump( $result );

		$costTable = $exportGetData->get2CostTable(2,1);
		
		$range = 'Sheet3!A1:K500';
		$values = $costTable["labourMachine"];
	  	$optParams = [];
	  	$optParams['valueInputOption'] = 'USER_ENTERED';
		$body = new Google_Service_Sheets_ValueRange( array(
  			'values' => $values
		) );
		$result = $service->spreadsheets_values->update($spreadsheetId, $range, $body, $optParams);

		var_dump( $result );
		

		$range = 'Sheet4!A1:K500';
		$values = $costTable["material"];
	  	$optParams = [];
	  	$optParams['valueInputOption'] = 'USER_ENTERED';
		$body = new Google_Service_Sheets_ValueRange( array(
  			'values' => $values
		) );
		$result = $service->spreadsheets_values->update($spreadsheetId, $range, $body, $optParams);

		
		var_dump( $result );

    }

    function getRequestBody() {
    	$json_value = '{
		    "properties": {
		        "title": "Dự toán",
		        "defaultFormat": {
		            "verticalAlignment": "MIDDLE",
		            "wrapStrategy": "WRAP",
		            "textFormat": {
		                "fontFamily": "Arial",
		                "fontSize": 12
		            }
		        }
		    },
		    "sheets": [{
		        "properties": {
		            "sheetId": 0,
		            "index": 0,
		            "title": "CP Xây lắp"
		        },
		        "merges": [{
		            "sheetId": 0,
		            "startColumnIndex": 0,
		            "endColumnIndex": 5,
		            "startRowIndex": 0,
		            "endRowIndex": 1
		        }, {
		            "sheetId": 0,
		            "startColumnIndex": 0,
		            "endColumnIndex": 5,
		            "startRowIndex": 2,
		            "endRowIndex": 3
		        }, {
		            "sheetId": 0,
		            "startColumnIndex": 0,
		            "endColumnIndex": 5,
		            "startRowIndex": 3,
		            "endRowIndex": 4
		        }, {
		            "sheetId": 0,
		            "startColumnIndex": 0,
		            "endColumnIndex": 5,
		            "startRowIndex": 4,
		            "endRowIndex": 5
		        }],
		        "data": [{
		            "startRow": 0,
		            "startColumn": 0,
		            "rowData": [{
		                "values": [{
		                    "userEnteredValue": {
		                        "stringValue": "BẢNG TỔNG HỢP CHI PHÍ XÂY LẮP"
		                    },
		                    "userEnteredFormat": {
		                        "horizontalAlignment": "CENTER"
		                    }
		                }]
		            }, {
		                "values": [{}]
		            }, {
		                "values": [{
		                    "userEnteredValue": {
		                        "stringValue": "CÔNG TRÌNH: "
		                    },
		                    "userEnteredFormat": {
		                        "horizontalAlignment": "CENTER",
		                        "textFormat": {
		                            "bold": true
		                        }
		                    }
		                }]
		            }, {
		                "values": [{
		                    "userEnteredValue": {
		                        "stringValue": "HẠNG MỤC: "
		                    },
		                    "userEnteredFormat": {
		                        "horizontalAlignment": "CENTER",
		                        "textFormat": {
		                            "bold": true
		                        }
		                    }
		                }]
		            }, {
		                "values": [{
		                    "userEnteredValue": {
		                        "stringValue": "ĐỊA ĐIỂM: "
		                    },
		                    "userEnteredFormat": {
		                        "horizontalAlignment": "CENTER",
		                        "textFormat": {
		                            "bold": true
		                        }
		                    }
		                }]
		            }],
		            "rowMetadata": [{}],
		            "columnMetadata": [{}]
		        }]
		    }]
		}';

    	return json_decode($json_value, true);
    }
}