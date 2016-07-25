angular.module('HMS')
    .controller('NavController', function ($cookies, $state, $scope) {
        if (!$cookies.get('googleToken')) {
            $state.go('login');
        }
        $scope.logOut = function () {
            $cookies.remove('googleToken');
            $state.go('login');
        };
        $scope.name = $cookies.get('googleName');
    })
    .controller('LoginController', function ($state, $scope, $cookies) {
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
                }, function (error) {
                    alert(JSON.stringify(error, undefined, 2));
                });
        });
        $scope.onSignIn = function (googleUser) {
            $cookies.put('googleToken', googleUser.getAuthResponse().id_token);
            $cookies.put('googleName', googleUser.getBasicProfile().getName());
            $state.go('home')
        };
    });
