angular.module('HMS')
    .controller('NavController', function (baseURL, $cookies, $http, $state, $stateParams, $rootScope, $scope, $uibModal) {
        if (!$cookies.get('googleToken'))
            $state.go('login');
        $scope.logOut = function () {
            $cookies.remove('googleToken');
            $state.go('login');
        };
        $http.get(baseURL + 'user').then(function (response) {
            $scope.user = response.data;
        });
        if ($state.current.name === 'home')
            $scope.stateName = 'home';
        else if ($stateParams.name)
            $scope.stateName = $stateParams.name;
        else
            $http.get(baseURL + 'construction/' + $stateParams.construction_id)
                .then(function (response) {
                    $scope.stateName = response.data.name;
                });
        $scope.deleteUser = function () {
            $http.delete(baseURL + 'user').then(function () {
                $scope.logOut();
            });
        };
        $scope.editConstruction = function () {
            if ($stateParams.construction_id) {
                $http.get(baseURL + 'construction/' + $stateParams.construction_id)
                    .then(function (response) {
                        $scope.name = response.data.name;
                        $scope.address = response.data.address;
                        $scope.supplier_id = response.data.supplier_id;
                        $scope.investor = response.data.investor;
                        $scope.contractor = response.data.contractor;
                        $scope.type = response.data.type;
                        $scope.design_type = response.data.design_type;
                        $scope.level = response.data.level;
                        $http.get(baseURL + 'supplier/' + $scope.supplier_id)
                            .then(function (response) {
                                $rootScope.supplier = response.data;
                            });
                    });
                $http.get(baseURL + 'suppliers').then(function (response) {
                    $scope.suppliers = response.data;
                });
                $uibModal.open({
                    templateUrl: 'views/modals/editConstruction.html',
                    controller: 'EditConstructionController',
                    scope: $scope
                }).result.then(function (name) {
                    $scope.stateName = name;
                });
            }
        };
    })

    .controller('EditConstructionController', function ($stateParams, $rootScope, $scope, $http, baseURL, $uibModalInstance) {
        $scope.edit = function () {
            $http({
                url: baseURL + 'construction/' + $stateParams.construction_id,
                method: "PUT",
                params: {
                    name: $scope.name,
                    supplier_id: $scope.supplier.id,
                    address: $scope.address,
                    investor: $scope.investor,
                    contractor: $scope.contractor,
                    type: $scope.type,
                    design_type: $scope.design_type,
                    level: $scope.level
                }
            }).then(function () {
                $rootScope.supplier = $scope.supplier;
                $uibModalInstance.close($scope.name);
            });
        }
    });
