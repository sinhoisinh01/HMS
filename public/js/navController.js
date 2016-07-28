angular.module('HMS')
    .controller('NavController', function (baseURL, $cookies, $http, $rootScope, $state, $stateParams, $scope, $uibModal) {
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
                $rootScope.constructionID =  response.data.id;
            })
        }  
        $scope.editConstruction = function (construction_id) {
            $http({
                url: baseURL + 'construction/' + construction_id,
                method: 'GET',
                params: {token: $cookies.get('googleToken')}
            }).then(function (response) {
                $scope.name = response.data.name;
                $scope.address = response.data.address;
                $scope.supplier_id = response.data.supplier_id;
                $scope.investor = response.data.investor;
                $scope.contractor = response.data.contractor;
                $scope.type = response.data.type;
                $scope.design_type = response.data.design_type;
                $scope.level = response.data.level;

            }, function () {
                $cookies.remove('googleToken');
                $state.go('login');
            });

            $uibModal.open({
                templateUrl: 'views/modals/editConstruction.html',
                controller: 'EditConstructionController',
                scope: $scope
            }).result.then(function () {
               
            });
        };   
    })
    .controller('EditConstructionController', function ($stateParams, $state, $http, baseURL, $scope, $uibModalInstance, $cookies) {
         $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
    
