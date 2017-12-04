<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class ChatbotController extends Controller
{
    function welcome(){
    	return response()->json("a");
    }
}