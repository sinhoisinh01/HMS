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
                url: baseURL + 'construction/'+ $stateParams.construction_id,
                method: 'GET',
                params: {token:$cookies.get('googleToken')}
            }).then(function (response){
                $rootScope.constructionName =  response.data.name;
            })
        }
    })
