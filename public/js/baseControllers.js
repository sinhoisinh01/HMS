angular.module('HMS')
    .controller('LoginController', ['$state', '$http', 'baseURL', '$scope',
        function ($state, $http, baseURL, $scope) {
            gapi.load('auth2', function () {
                auth2 = gapi.auth2.init({
                    client_id: '711327534359-06jkjslp3oqpmsrqmdivg3pk0go8pbud.apps.googleusercontent.com'
                });
            });
            $scope.onSignIn = function () {
                // keep some information on front-end
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
    .controller('MenuController', ['$stateParams', '$http', 'baseURL', '$scope',
        function ($stateParams, $http, baseURL, $scope) {

        }]);