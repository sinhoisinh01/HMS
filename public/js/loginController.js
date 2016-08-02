angular.module('HMS')
    .controller('LoginController', function ($state, $scope, $stateParams, $cookies, $http, baseURL, $window) {
        if ($cookies.get('googleToken')) {
            $state.go('home');
        }
        if ($stateParams.token) {
            $cookies.put('googleToken', $stateParams.token);
            $state.go('home');
        }
        $scope.signIn = function () {
            $http.get(baseURL + 'login').then(function (response) {
                $window.location = response.data;
            });
        };
    });
