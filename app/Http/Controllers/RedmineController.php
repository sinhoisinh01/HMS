<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use App\Services\Redmine\RedmineProject;
use Illuminate\Support\Facades\Auth;
use App\Models\RedmineSetting;

class RedmineController extends Controller {

	function initRedmine(Request $request) {
		$redmineSetting = $request->input('redmine_setting');
		$redmineSetting['user_id'] = Auth::user()->id;
		RedmineSetting::where( 'user_id', Auth::user()->id )->forceDelete();
		return response()->json( RedmineSetting::create( $redmineSetting ) );
	}

	function getSetting() {
		return response()->json( Auth::user()->redmine_setting()->first() );
	}

	function updateSetting(Request $request) {
		return response()->json(
		  RedmineSetting::where( 'user_id', Auth::user()->id )
			->update( $request->input('redmine_setting') )
		);
	}

	function get() {
		$projectUtils = new RedmineProject( Auth::user()->redmine_setting()->first() );
		return response()->json($projectUtils->get());
	}

	function addConstruction(Request $request) {
		$projectUtils = new RedmineProject( Auth::user()->redmine_setting()->first() );
		return response()->json($projectUtils->addConstruction(
			Auth::user()->id, 
			$request->input('construction_id')
		));
	}

	function addCategory(Request $request) {
		$projectUtils = new RedmineProject( Auth::user()->redmine_setting()->first() );
		return response()->json($projectUtils->addCategory(
			Auth::user()->id, 
			$request->input('category_id')
		));
	}
}