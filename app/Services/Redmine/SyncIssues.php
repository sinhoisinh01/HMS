<?php
/*
 * Author: Doan Phuc Sinh
 * Description: Use to Add, Update, Delete work to sync with issues in Redmine
 */

namespace App\Services\Redmine;

use Redmine\Client;
use App\Services\Redmine\RedmineWithCurl;

class SyncIssues {
  const SUBCATEGORY_ID_FIELD_NAME = 'HMS_swid';

  private $client;
  private $redmine_url;
  private $redmineSetting;

  // the Id of the custom field in redmine which store subcategory work id
  private $hmsSwidId;

  public function __construct($redmineSetting) {
    $this->redmineSetting = $redmineSetting;
    $this->client = new Client( $redmineSetting->redmine_url, $redmineSetting->api_access_key );
    $this->redmine_url = $redmineSetting->redmine_url;
    $this->setSwidId();
  }

  private function setSwidId() {
    $redmineCurlService = new RedmineWithCurl($this->redmineSetting);
    $customField = $redmineCurlService->getCustomFieldByName(self::SUBCATEGORY_ID_FIELD_NAME);
    $this->hmsSwidId = $customField[0]["id"];
  }

  public function add() {

  }

  public function edit() {

  }

  // Summary: remove the issue which have HMS_swid = $subcateogryId
  // Return: true if issue exists and have been removed. false if issue not exists
  // Params:
  //  @subcategoryId: int
  public function remove($subcategoryId) {
    // get Issue which have $subcategoryId
    $issues = $this->client->issue->all([
      'cf_' . $this->hmsSwidId => $subcategoryId
    ]);
    if ($issues['total_count'] == 0) {
      return false;
    } else {
      $issue = $issues["issues"][0];
      $this->client->issue->remove($issue["id"]);
      return true;
    }
  }
}