<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use App\Services\Redmine\RedmineProject;
use Illuminate\Support\Facades\Auth;

class RedmineController extends Controller {

	function get() {
		$projectUtils = new RedmineProject('http://localhost/redmine/', '177e05f58047bb299c1943e1fba953962a2b9079');
		return response()->json($projectUtils->get());
	}

	function addConstruction(Request $request) {
		$projectUtils = new RedmineProject('http://localhost/redmine/', '177e05f58047bb299c1943e1fba953962a2b9079');
		return response()->json($projectUtils->addConstruction(
			Auth::user()->id, 
			$request->input('construction_id')
		));
	}

	function addCategory(Request $request) {
		$projectUtils = new RedmineProject('http://localhost/redmine/', '177e05f58047bb299c1943e1fba953962a2b9079');
		return response()->json($projectUtils->addCategory(
			Auth::user()->id, 
			$request->input('category_id')
		));
	}
}