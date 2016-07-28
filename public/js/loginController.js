angular.module('HMS')
    .controller('LoginController', function ($state, $scope, $rootScope, $cookies) {
        if ($cookies.get('googleToken')) {
            $state.go('home');
        }
        gapi.load('auth2', function () {
            auth2 = gapi.auth2.init({
                client_id: '711327534359-06jkjslp3oqpmsrqmdivg3pk0go8pbud.apps.googleusercontent.com'
            });
            auth2.attachClickHandler('googleSignIn', {},
                function (googleUser) {
                    $scope.onSignIn(googleUser);
                });
        });
        $scope.onSignIn = function (googleUser) {
            $cookies.put('googleToken', googleUser.getAuthResponse().id_token);
            $cookies.put('googleName', googleUser.getBasicProfile().getName());
            //$cookies.put('googleMail', googleUser.getBasicProfile().getEmail());
            $cookies.put('googleImageUrl', googleUser.getBasicProfile().getImageUrl());
            $state.go('home')
        };
    });
