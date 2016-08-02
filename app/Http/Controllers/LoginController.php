<?php

namespace App\Http\Controllers;

use App\Models\User;
use Google_Client;

class LoginController extends Controller
{
    function login()
    {
        $client = new Google_Client();
        $client->setClientId('711327534359-06jkjslp3oqpmsrqmdivg3pk0go8pbud.apps.googleusercontent.com');
        $client->setClientSecret('1g6sPg-yQX8NgOkwYamie2o1');
        $client->setRedirectUri('http://localhost/HMS/public/loginCallBack');
        $client->setScopes(['profile', 'email']);
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
        $ticket = $client->verifyIdToken($token->id_token);
        if ($ticket) {
            $data = $ticket->getAttributes();
            $user = User::where('google_id', $data['payload']['sub'])->first();
            if (!$user)
                User::create(['email' => $data['payload']['email'],
                    'google_id' => $data['payload']['sub'],
                    'refresh_token' => $token->refresh_token,
                    'name' => '',
                    'urlImage' => '']);
        }
        return redirect('http://localhost/HMS/public/HMS.html#/login/' . $token->id_token);
    }
}