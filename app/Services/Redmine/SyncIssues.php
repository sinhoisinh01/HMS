<?php
/*
 * Author: Doan Phuc Sinh
 * Description: Use to Add, Update, Delete work to sync with issues in Redmine
 */

namespace App\Services\Redmine;

use Redmine\Client;
use App\Services\Redmine\RedmineWithCurl;
use App\Services\Redmine\RedmineProject;
use App\Services\Redmine\SyncProject;
use Illuminate\Support\Facades\DB;

class SyncIssues {
  const SUBCATEGORY_ID_FIELD_NAME = 'HMS_swid';
  const CATEGORY_PREFIX = 'hms-category-';
  const SUBCATEGORY_PREFIX = 'hms-subcategory-';

  private $client;
  private $redmine_url;
  private $redmineSetting;
  private $redmineProjectService;

  // the Id of the custom field in redmine which store subcategory work id
  private $hmsSwidId;

  public function __construct($redmineSetting) {
    $this->redmineSetting = $redmineSetting;
    $this->client = new Client( $redmineSetting->redmine_url, $redmineSetting->api_access_key );
    $this->redmine_url = $redmineSetting->redmine_url;
    $this->redmineProjectService = new RedmineProject($redmineSetting);
    $this->setSwidId();
  }

  private function setSwidId() {
    $redmineCurlService = new RedmineWithCurl($this->redmineSetting);
    $customField = $redmineCurlService->getCustomFieldByName(self::SUBCATEGORY_ID_FIELD_NAME);
    $this->hmsSwidId = $customField[0]["id"];
  }

  // Summary: Add work to redmine project as issue
  // Return: return true if success, return false if errors
  // Params:
  //  @userId: int
  //  @subcategoryId: int
  public function add($userId, $subcategoryWorkId) {
    // find redmine project id which new issue will belong to.
    // data to get category id and subcategory name
    $data = DB::table('subcategory_work')
      ->join('subcategories', 'subcategory_work.subcategory_id', '=', 'subcategories.id')
      ->join('categories', 'subcategories.category_id', '=', 'categories.id')
      ->where('subcategory_work.id', $subcategoryWorkId)
      ->select(
        'categories.id as category_id',
        'subcategories.id as subcategory_id',
        'subcategories.name as subcategory_name'
      )
      ->first();
    $projectPrefix = $data->subcategory_name == '' ? self::CATEGORY_PREFIX : self::SUBCATEGORY_PREFIX;
    $projectIdentifier =  $projectPrefix . $userId . '-';
    $projectIdentifier .= $data->subcategory_name == '' ? $data->category_id : $data->subcategory_id;
    $project = $this->client->project->show($projectIdentifier);
    if (!$project) {
      $redmineSyncProjectService = new SyncProject($this->redmineSetting);
      $redmineProjectId = $redmineSyncProjectService->syncCategory($userId, $subcategoryWorkId);
    } else {
      $redmineProjectId = $project["project"]["id"];
    }
    return $this->redmineProjectService->addWork($userId, $subcategoryWorkId, $redmineProjectId);
  }

  // Summary: update the issue which have field HMS_swid equals subcategoryId
  // Return: 
  //    return true if success
  //    return false if fail.
  // Params:
  //  @subcategoryId: int
  public function edit($subcategoryWorkId) {
    // get Issue which have $subcategoryWorkId
    $issues = $this->client->issue->all([
      'cf_' . $this->hmsSwidId => $subcategoryWorkId
    ]);
    if ($issues['total_count'] == 0) {
      return false;
    } else {
      $issue = $issues["issues"][0];

      // new issue data to update
      $workSubject = $this->redmineProjectService->getWorkSubject($subcategoryWorkId);
      $workDescriptions = $this->redmineProjectService->getWorkDescriptions($subcategoryWorkId);

      $this->client->issue->update(
        $issue["id"], 
        [
          'subject'     => $workSubject,
          'description' => $workDescriptions
        ]
      );
      return true;
    }
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