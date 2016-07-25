<?php

namespace App\Http\Controllers;

use App\Construction;
use Illuminate\Support\Facades\Auth;

class ConstructionController extends Controller
{
    function getAll()
    {
        return response()->json(Auth::user()->constructions);
    }

    function getRecent()
    {
        $recentConstructions = Auth::user()->constructions()
            ->orderBy('updated_at', 'DESC')
            ->limit(4)
            ->get();
        return response()->json($recentConstructions);
    }

    function add()
    {
        foreach(['supplier_id','address','investor','contractor','type','design_type','level'] as $field) {
            if (!isset($_GET[$field]))
                $_GET[$field] = null;
        }
        $construction = Construction::create([
            'user_id' => Auth::user()->id,
            'name' => $_GET['name'],
            'supplier_id' => $_GET['supplier_id'],
            'address' => $_GET['address'],
            'investor' => $_GET['investor'],
            'contractor' => $_GET['contractor'],
            'type' => $_GET['type'],
            'design_type' => $_GET['design_type'],
            'level' => $_GET['level']
        ]);
        return response()->json($construction->id);
    }
}