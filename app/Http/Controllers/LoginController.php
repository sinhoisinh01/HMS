<?php

namespace App\Http\Controllers;

use App\Models\User;
use Google_Client;
use Google_Service_Oauth2;

class LoginController extends Controller
{
    function login()
    {
        $client = new Google_Client();
        $client->setClientId('711327534359-06jkjslp3oqpmsrqmdivg3pk0go8pbud.apps.googleusercontent.com');
        $client->setClientSecret('1g6sPg-yQX8NgOkwYamie2o1');
        $client->setRedirectUri('http://localhost/HMS/public/loginCallBack');
        $client->setScopes(['profile','email']);
        $client->setAccessType('offline');
        $auth_url = $client->createAuthUrl();
        return $auth_url;
    }

    function callBack()
    {
        $client = new Google_Client();
        $client->setClientId('711327534359-06jkjslp3oqpmsrqmdivg3pk0go8pbud.apps.googleusercontent.com');
        $client->setClientSecret('1g6sPg-yQX8NgOkwYamie2o1');
        $client->setRedirectUri('http://localhost/HMS/public/loginCallBack');
        $client->authenticate($_GET['code']);
        $token = json_decode($client->getAccessToken());
        $service = new Google_Service_Oauth2($client);
        $userInfo = $service->userinfo->get();
        $user = User::where('google_id', $userInfo->id)->first();
        if (!$user)
            User::create(['google_id' => $userInfo->id,
                'refresh_token' => $token->refresh_token,
                'email' => $userInfo->email,
                'name' => $userInfo->name,
                'picture' => $userInfo->picture]);
        return redirect('http://localhost/HMS/public/HMS.html#/login/' . $token->id_token);
    }
}