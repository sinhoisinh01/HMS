<?php

namespace App\Http\Controllers;

use App\Models\User;
use Google_Client;
use Google_Service_Oauth2;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    function login()
    {
        $client = new Google_Client();
        $client->setClientId(env('APP_CLIENT_ID'));
        $client->setRedirectUri('http://localhost/HMS/public/loginCallBack');
        $client->setScopes(['profile', 'email']);
        $client->setAccessType('offline');
        $auth_url = $client->createAuthUrl();
        return $auth_url;
    }

    function callBack()
    {
        $client = new Google_Client();
        $client->setClientId(env('APP_CLIENT_ID'));
        $client->setClientSecret(env('APP_CLIENT_SECRET'));
        $client->setRedirectUri('http://localhost/HMS/public/loginCallBack');
        $client->authenticate($_GET['code']);
        $service = new Google_Service_Oauth2($client);
        $userInfo = $service->userinfo->get();
        $token = json_decode($client->getAccessToken())->id_token;
        $user = User::where('google_id', $userInfo->id)->first();
        if (!$user)
            User::create(['google_id' => $userInfo->id,
                'refresh_token' => $client->getRefreshToken(),
                'token' => $token,
                'email' => $userInfo->email,
                'name' => $userInfo->name,
                'picture' => $userInfo->picture]);
        else
            $user->update(['token' => $token]);
        return redirect('http://localhost/HMS/public/HMS.html#/login/' . substr($token,0,255));
    }

    function refreshToken()
    {
        $client = new Google_Client();
        $client->setClientId(env('APP_CLIENT_ID'));
        $client->setClientSecret(env('APP_CLIENT_SECRET'));
        $client->refreshToken(Auth::user()->refresh_token);
        $token = json_decode($client->getAccessToken());
        //use this token to connect to google drive api
    }
}