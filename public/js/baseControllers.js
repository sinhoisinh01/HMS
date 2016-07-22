angular.module('HMS')
    .controller('LoginController', ['$state', '$scope','$rootScope',
        function ($state, $scope, $rootScope) {
            gapi.load('auth2', function () {
                auth2 = gapi.auth2.init({
                    client_id: '711327534359-06jkjslp3oqpmsrqmdivg3pk0go8pbud.apps.googleusercontent.com'
                });
            });
            $scope.onSignIn = function (googleUser) {
                $rootScope.token = googleUser.getAuthResponse().id_token;
                console.log($rootScope.token);
                $state.go('home')
            };
            $scope.signOut = function () {
                auth2.disconnect();
            };
            gapi.signin2.render('signInButton',
                {
                    'onsuccess': $scope.onSignIn
                });
        }])
    .controller('NavController', function () {});