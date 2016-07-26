angular.module('HMS')
    .controller('NavController', function (baseURL, $cookies, $http, $rootScope, $state, $stateParams, $scope) {
        if (!$cookies.get('googleToken')) {
            $state.go('login');
        }
        $scope.logOut = function () {
            $cookies.remove('googleToken');
            $state.go('login');
        };
        $scope.userName = $cookies.get('googleName'); 
        $scope.userPicture = $cookies.get('googleImageUrl'); 
        $scope.$state = $state;
        if ($state.current.name !== 'home') {
            $http({
                url: baseURL + 'construction/'+$stateParams.construction_id+'/getName',
                method: 'GET',
                params: {token:$cookies.get('googleToken')}
            }).then(function (response){
                $rootScope.constructionName =  response.data;
            })
        }
    })
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
            $cookies.put('googleImageUrl', googleUser.getBasicProfile().getImageUrl());
            $state.go('home')
        };
    });
