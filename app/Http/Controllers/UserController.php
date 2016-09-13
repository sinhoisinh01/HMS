<?php

namespace App\Http\Controllers;

use App\Models\User;
use Google_Client;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller;

class UserController extends Controller
{
    function get()
    {
        return response()->json(User::find(Auth::user()->id));
    }

    function remove()
    {
        $client = new Google_Client();
        $client->setClientId(env('APP_CLIENT_ID'));
        $client->setClientSecret(env('APP_CLIENT_SECRET'));
		$client->revokeToken(Auth::user()->refresh_token);
        User::destroy(Auth::user()->id);
    }
}