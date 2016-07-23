angular.module('HMS')
    .controller('LoginController', ['$state', '$scope', '$cookies',
        function ($state, $scope, $cookies) {
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
                $state.go('home')
            };
        }])
    .controller('NavController', function () {
    });