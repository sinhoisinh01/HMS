<?php
/*
 * Author: Doan Phuc Sinh
 * Description: Use to get Redmine Project as Eloquent Collections
 */
namespace App\Services\Redmine;

use Redmine\Client;
use Illuminate\Support\Collection;

class RedmineProjectCollection {
	const PROJECT_PREFIX = 'hms';
	private $client;
	private $hms_projects;
	private $root_projects;
	private $redmine_url;

	public function __construct($redmineSetting) {
		$this->client = new Client( $redmineSetting->redmine_url, $redmineSetting->api_access_key );
		$this->redmine_url = $redmineSetting->redmine_url;
		$this->listAllHmsProject();
		$this->listAllRootProject();
	}

	/*
	 * Summary: Get all HMS Projects
	 * Return: All HMS Projects as Eloquent Collection
	 */
	public function getAllHmsProject() {
		return $this->hms_projects;
	}

	/*
	 * Summary: Get all Root Projects
	 * Return: All Root Projects as Eloquent Collection
	 */
	public function getAllRootProject() {
		$this->addProjectChilds();
		return $this->root_projects;
	}

	/*
	 * Summary: Add all redmine projects which have hms prefix in identifier to
	 *	$hms_projects (Eloquent Collection)
	 */
	private function listAllHmsProject() {
		$hms_projects = array();
		$redmine_projects = $this->client->project->listing();
		foreach ($redmine_projects as $project_id) {
			$project = $this->client->project->show($project_id)['project'];
			if ( is_numeric( strpos($project['identifier'], self::PROJECT_PREFIX) ) ) {
				$project['project_url'] = $this->redmine_url . "/projects/" . $project['identifier'];
				array_push($hms_projects, $project);
			}	
		}
		$this->hms_projects = collect( $hms_projects );
	}

	/*
	 * Summary: Add all of construction and orphaned category projects
	 *	 to $root_projects (Eloquent Collection)
	 */
	private function listAllRootProject() {
		$this->root_projects = $this->hms_projects->reject(function ($value, $key) {
			return isset( $value['parent'] );
		});
	}

	/*
	 * Summary: Add childs for Root project ($root_projects) and its childs
	 */
	private function addProjectChilds() {
		$this->root_projects->transform(function ($root_project, $key) {
			// get all childs root_project (childs level 1)
			$childsLevel1 = $this->hms_projects->where('parent.id', $root_project['id']);
			$childsLevel1->transform(function ($child1, $index1) {
				
				// get all childs of the childs level 1 (childs level 2)
				$childsLevel2 = $this->hms_projects->where('parent.id', $child1['id'])->toArray();
				
				// push all childs level 2 to property 'childs' of child level 1
				$child1['childs'] = array();
				foreach ($childsLevel2 as $index2 => $child2) {
					array_push($child1['childs'], $child2);
				}
				return $child1;
			})->toArray();
			
			// push all childs level 1 to property 'childs' of root project
			$root_project['childs'] = array();
			foreach ($childsLevel1 as $index1 => $child1) {
				array_push($root_project['childs'], $child1);
			}
			return $root_project;
		});
	}
}