<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function get()
    {
        return response()->json(User::find(Auth::user()->id));
    }

    function remove()
    {
        User::destroy(Auth::user()->id);
		//$client->revokeToken();
    }
}