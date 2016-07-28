<?php

namespace App\Providers;

use App\Models\User;
use Google_Client;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.
        $this->app['auth']->viaRequest('api', function ($request) {
            $user = null;
            $client = new Google_Client();
            $client->setClientId('711327534359-06jkjslp3oqpmsrqmdivg3pk0go8pbud.apps.googleusercontent.com');
            $client->setClientSecret('1g6sPg-yQX8NgOkwYamie2o1');
            if ($request->input('token')) {
                $ticket = $client->verifyIdToken($request->token);
                if ($ticket) {
                    $data = $ticket->getAttributes();
                    $user = User::where('google_id', $data['payload']['sub'])->first();
                    if (!$user)
                        $user = User::create(['email' => $data['payload']['email'],
                            'google_id' => $data['payload']['sub'],
                            'first_name' => $data['payload']['given_name'],
                            'last_name' => $data['payload']['family_name']]);
                }
            }
            return $user;
        });
    }
}
