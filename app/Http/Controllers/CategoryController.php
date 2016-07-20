<?php

namespace App\Http\Controllers;

use App\Category;
use App\Construction;

class CategoryController extends Controller
{
    function getCategories($idConstruction) {
        $categories = Category::where('construction_id',$idConstruction)->get();
        return response()->json($categories);
    }
}