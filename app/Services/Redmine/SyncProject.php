<?php
/*
 * Author: Doan Phuc Sinh
 * Description: Use to sync HMS Category and Subcategory with Redmine Project
 */
namespace App\Services\Redmine;

use Redmine\Client;
use App\Models\Category;
use App\Models\SubcategoryWork;
use App\Models\Construction;

class SyncProject {
  const CATEGORY_PREFIX = 'hms-category-';
  const SUBCATEGORY_PREFIX = 'hms-subcategory-';
  const CONSTUCTION_PREFIX = 'hms-construction-';

  private $client;
  private $redmineSetting;

  public function __construct($redmineSetting) {
    $this->redmineSetting = $redmineSetting;
    $this->client = new Client( $redmineSetting->redmine_url, $redmineSetting->api_access_key );
  }

  // Summary: create a category as an redmine issue if a subcategory_work has been created 
  //    (doesn't belong to any projet)
  // Params:
  //  @userId: int
  //  @subcategoryId: int
  public function syncCategory($userId, $subcategoryWorkId) {
    $subcategory = SubcategoryWork::find($subcategoryWorkId)->subcategory;
    $category = Category::find($subcategory->category_id);
    $categoryProjectId = $this->addCategory($userId, $category);
    $result = $this->addSubcategory($userId, $subcategory, $categoryProjectId);
    return $result == NULL ? $categoryProjectId : $result;
  }

  // Summary: check if the category belongs to any construction project or not
  // Params:
  //  @userId: int
  //  @category: eloquent collection
  // Return: Redmine construction project id if exist
  //       NULL if not exist
  public function getConstructionProjectParentId($userId, $category) {
    $construction = $category->construction();
    $projectIdentifier = self::CONSTUCTION_PREFIX . $userId . "-" . $constructionId;
    $constructionProject = $this->client->project->show($projectIdentifier);
    if (!$constructionProject) {
      return $constructionProject['id'];
    }
    return NULL;
  }

  public function addCategory($userId, $category) {
    $projectIdentifier = self::CATEGORY_PREFIX . $userId . "-" . $category->id;
    $categoryProject = $this->client->project->show($projectIdentifier);
    if (!$categoryProject) {
      $constructionProjectId = getConstructionProjectParentId($userId, $category);
      $result = $this->client->project->create([
        'name'      => $category->name,
        'identifier'  => $projectIdentifier,
        'parent_id'   => $constructionProjectId,
        'tracker_ids'   => [],
        'is_public'   => 0,
      ]);
      return $result->id;
    }
    return $categoryProject["project"]["id"];
  }

  public function addSubcategory($userId, $subcategory, $categoryProjectId) {
    if ($subcategory->name != '') {
      $projectIdentifier = self::SUBCATEGORY_PREFIX . $userId . "-" . $subcategory->id;
      $subcategoryProject = $this->client->project->show($projectIdentifier);
      if (!$subcategoryProject) {
        $result = $this->client->project->create([
          'name'      => $subcategory->name,
          'identifier'  => $projectIdentifier,
          'parent_id'   => $categoryProjectId,
          'tracker_ids'   => [],
          'is_public'   => 0,
        ]);
        return $result->id;
      } else {
        return $subcategoryProject["project"]["id"];
      }
    }
    return NULL;
  }
}