<?php

/*
 * Author: Doan Phuc Sinh
 * Description: Using Redmine Api (custom fields) with cURL
 */

namespace App\Services\Redmine;

use Curl;

class RedmineWithCurl {
  private $redmineUrl;
  private $apiKey;

  public function __construct($redmineSettings) {
    $this->redmineUrl = $redmineSettings->redmine_url;
    $this->apiKey = $redmineSettings->api_access_key;
  }

  public function getCustomFields() {
    $curl = curl_init();
    $url = $this->redmineUrl . "/custom_fields.json?key=" . $this->apiKey;
    // Set some options - we are passing in a useragent too here
    curl_setopt_array($curl, array(
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_URL => $url
    ));
    // Send the request & save response to $resp
    $result = curl_exec($curl);
    // Close request to clear up some resources
    curl_close($curl);
    return json_decode($result);
  }

  public function getCustomFieldByName($name) {
    $result = null;
    $custom_fields = $this->getCustomFields()->custom_fields;
    for ( $i = 0; $i < sizeof($custom_fields); $i++ ) { 
      if ($custom_fields[$i]->name == $name) {
        $result = [
          [
            'id'    => $custom_fields[$i]->id,
            'name'  => $custom_fields[$i]->name,
            'value' => 0
          ]
        ];
        break;
      }
    }
    return $result;
  }
}