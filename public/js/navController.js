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
        if ($state.current.name === 'home')
            $scope.stateName = 'home';
        else if ($stateParams.name)
            $scope.stateName = $stateParams.name;
        else // In case of reload
            $http({
                url: baseURL + 'construction/' + $stateParams.construction_id,
                method: 'GET',
                params: {token: $cookies.get('googleToken')}
            }).then(function (response) {
                $rootScope.stateName = response.data.name;
            });
        $scope.editConstruction = function () {
            if ($stateParams.construction_id) {
                $http({
                    url: baseURL + 'construction/' + $stateParams.construction_id,
                    method: 'GET',
                    params: {
                        token: $cookies.get('googleToken')
                    }
                }).then(function (response) {
                    $scope.name = response.data.name;
                    $scope.address = response.data.address;
                    var $selected = {id:response.data.supplier_id,name:response.data.name};
                    $scope.supplier_id = $selected;
                    $scope.investor = response.data.investor;
                    $scope.contractor = response.data.contractor;
                    $scope.type = response.data.type;
                    $scope.design_type = response.data.design_type;
                    $scope.level = response.data.level;
                }, function () {
                    $cookies.remove('googleToken');
                    $state.go('login');
                });

                $http({
                    url: baseURL + 'suppliers',
                    method: 'GET',
                    params: {token: $cookies.get('googleToken')}
                }).then(function(response){
                    $scope.suppliers = response.data;
                });//get all suppliers to select

                $uibModal.open({
                    templateUrl: 'views/modals/editConstruction.html',
                    controller: 'EditConstructionController',
                    scope: $scope
                }).result.then(function (name) {
                    $scope.stateName =  name;
                });
            }
        };
    })
    .controller('EditConstructionController', function ($stateParams, $state, $http, baseURL, $scope, $uibModalInstance, $cookies) {
        $scope.edit = function () {
            $http({
                url: baseURL + 'construction/' + $stateParams.construction_id,
                method: "PUT",
                params: {
                    token: $cookies.get('googleToken'),
                    name: $scope.name,
                    supplier_id: $scope.supplier_id.id,
                    address: $scope.address,
                    investor: $scope.investor,
                    contractor: $scope.contractor,
                    type: $scope.type,
                    design_type: $scope.design_type,
                    level: $scope.level
                }
        }).then(function (response) {
            $uibModalInstance.close($scope.name);
        }, function () {
                $cookies.remove('googleToken');
                $state.go('login');
            });
        };   
       $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
    
