<?php

namespace App\Http\Controllers;

use App\Category;
use App\Construction;

class ConstructionController extends Controller
{
	function getAll() {
		$idUser = 0;// would be session['user_id']
        $construction = Construction::where('user_id',$idUser)->get();
        return response()->json($construction);
    }
    function getRecent() {
    	$idUser = 0;// would be session['user_id']
        $recentConstructions = Construction::where('user_id',$idUser)
        ->orderBy('updated_at', 'DESC')
        ->limit(4)
        ->get();

        return response()->json($recentConstructions);
    }
}