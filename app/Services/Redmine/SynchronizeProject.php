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

class SynchronizeProject {
  const PROJECT_PREFIX = 'hms-category-';
  private $client;
  private $redmine_url;
  private $redmineSetting;

  public function __construct($redmineSetting) {
    $this->redmineSetting = $redmineSetting;
    $this->client = new Client( $redmineSetting->redmine_url, $redmineSetting->api_access_key );
    $this->redmine_url = $redmineSetting->redmine_url;
  }

  /*
   * Summary: Get all Issues by Category Id
   * Params: int userId, int categoryId
   * Return: Issues as Eloquent Collection
   */
  public function getIssuses() {
    $redmineIssueUtils = new SyncIssues($this->redmineSetting);
    $result = $redmineIssueUtils->remove(5);
    $result = $redmineIssueUtils->add(3, 5);
    return $result;
  }
}