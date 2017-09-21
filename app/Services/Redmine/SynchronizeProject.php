<?php
/*
 * Author: Doan Phuc Sinh
 * Description: Use to sync HMS Project with Redmine Project
 */
namespace App\Services\Redmine;

use Redmine\Client;
use App\Services\Redmine\RedmineWithCurl;
use App\Services\Redmine\SyncIssues;
use Illuminate\Support\Collection;
use App\Models\Construction;
use App\Models\Category;
use App\Models\Subcategory;

class SynchronizeProject {
  const CONSTRUCTION_PROJECT_PREFIX = 'hms-construction-';
  const CATEGORY_PROJECT_PREFIX = 'hms-category-';
  const SUBCATEGORY_PROJECT_PREFIX = 'hms-subcategory-';
  private $client;
  private $redmine_url;
  private $redmineSetting;

  public function __construct($redmineSetting) {
    $this->redmineSetting = $redmineSetting;
    $this->client = new Client( $redmineSetting->redmine_url, $redmineSetting->api_access_key );
    $this->redmine_url = $redmineSetting->redmine_url;
  }

  /*
   * Summary: Create, Update or Remove Redmine Issues to sync with HMS construction
   *    The string will follow the rules:
   *      if use C:<subcategory_work_id_created> means Create new subcategory_work
   *      if use U:<subcategory_work_id_changed> means Update a subcategory_work
   *      if use D:<subcategory_work_id_deleted> means Delete a subcategory_work
   * Params: @userId, 
   *    @issuesString: has the pattern like below:
   *      C:<subcategory_work_id_created[0]>;...C:<subcategory_work_id_created[n]>
   *      U:<subcategory_work_id_changed[0]>;...<subcategory_work_id_changed[n]>;
   *      D:<subcategory_work_id_deleted[0]>;...<subcategory_work_id_deleted[n]>;
   *    Example: C:1;U:6;D:7;C:9;
   * Return true if success, return error message if fail
   */
  public function syncIssuses($userId, $issuesString) {
    try {
      $redmineIssueUtils = new SyncIssues($this->redmineSetting);
      $items = explode(";", $issuesString);
      for ( $i = 0; $i < sizeof($items); $i++ ) { 
        $issueItems = explode(":", $items[$i]);
        switch ($issueItems[0]) {
          case 'C':
            $redmineIssueUtils->add($userId, $issueItems[1]);
            break;        
          case 'U':
            $redmineIssueUtils->edit($issueItems[1]);
            break;
          case 'D':
            $redmineIssueUtils->remove($issueItems[1]);
            break;
          default:
            break;
        }
      }
      return true;     
    } catch (Exception $e) {
      return ["message" => $e->getMessage() . "\n"];
    }
  }

  /*
   * Summary: Use for sync with Redmine Project 
   *    when user edit a construction, category or subcategory
   * Params:  @userId: the id of user
   *          @type: can be 'construction', 'category' or 'subcategory'
   *          @id: the id of construction, category or subcategory
   * Return true if success, return false if fail
   */
  public function updateProject($userId, $type, $id) {
    switch ($type) {
      case 'construction':
        $hmsProject = Construction::find($id);
        $redmineProjectIdentifier = self::CONSTRUCTION_PROJECT_PREFIX . $userId . "-" . $id;
        $redmineProject = $this->client->project->show($redmineProjectIdentifier);
        break;
      case 'category':
        $hmsProject = Category::find($id);
        $redmineProjectIdentifier = self::CATEGORY_PROJECT_PREFIX . $userId . "-" . $id;
        $redmineProject = $this->client->project->show($redmineProjectIdentifier);
        break;
      case 'subcategory':
        $hmsProject = Subcategory::find($id);
        $redmineProjectIdentifier = self::SUBCATEGORY_PROJECT_PREFIX . $userId . "-" . $id;
        $redmineProject = $this->client->project->show($redmineProjectIdentifier);
        break;
    }
    if ($redmineProject) {
      $redmineProjecId = $redmineProject["project"]["id"];
      $this->client->project->update($redmineProjecId, ['name' => $hmsProject->name]);
      return true;
    } else {
      return false;
    }
  }

  /*
   * Summary: Use for sync with Redmine Project 
   *    when user remove a construction, category or subcategory
   * Params:  @userId: the id of user
   *          @type: can be 'construction', 'category' or 'subcategory'
   *          @id: the id of construction, category or subcategory
   * Return true if success, return false if fail
   */
  public function removeProject($userId, $type, $id) {
    switch ($type) {
      case 'construction':
        $hmsProject = Construction::find($id);
        $redmineProjectIdentifier = self::CONSTRUCTION_PROJECT_PREFIX . $userId . "-" . $id;
        $redmineProject = $this->client->project->show($redmineProjectIdentifier);
        break;
      case 'category':
        $hmsProject = Category::find($id);
        $redmineProjectIdentifier = self::CATEGORY_PROJECT_PREFIX . $userId . "-" . $id;
        $redmineProject = $this->client->project->show($redmineProjectIdentifier);
        break;
      case 'subcategory':
        $hmsProject = Subcategory::find($id);
        $redmineProjectIdentifier = self::SUBCATEGORY_PROJECT_PREFIX . $userId . "-" . $id;
        $redmineProject = $this->client->project->show($redmineProjectIdentifier);
        break;
    }
    if ($redmineProject && is_null($hmsProject)) {
      $redmineProjecId = $redmineProject["project"]["id"];
      $this->client->project->remove($redmineProjecId);
      return true;
    }
    return false;
  }
}