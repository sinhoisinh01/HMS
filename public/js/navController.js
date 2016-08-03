angular.module('HMS')
    .controller('NavController', function ($interval, baseURL, $cookies, $http, $state, $stateParams, $scope, $uibModal) {
        if (!$cookies.get('googleToken'))
            $state.go('login');
        $scope.logOut = function () {
            $cookies.remove('googleToken');
            $state.go('login');
        };
        $scope.deleteUser = function () {
            $http({
                url: baseURL + 'user',
                method: 'DELETE',
                params: {token: $cookies.get('googleToken')}
            }).then(function () {
                $scope.logOut();
            });
        };
        $http({
            url: baseURL + 'user',
            method: 'GET',
            params: {token: $cookies.get('googleToken')}
        }).then(function (response) {
            $scope.user = response.data;
        });
        if ($state.current.name === 'home')
            $scope.stateName = 'home';
        else if ($stateParams.name)
            $scope.stateName = $stateParams.name;
        else
            $http({
                url: baseURL + 'construction/' + $stateParams.construction_id,
                method: 'GET',
                params: {token: $cookies.get('googleToken')}
            }).then(function (response) {
                $scope.stateName = response.data.name;
            });
        $scope.editConstruction = function () {
            if ($stateParams.construction_id) {
                $http({
                    url: baseURL + 'construction/' + $stateParams.construction_id,
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
                    $http({
                        url: baseURL + 'supplier/' + $scope.supplier_id,
                        method: 'GET',
                        params: {token: $cookies.get('googleToken')}
                    }).then(function (response) {
                        $scope.supplier = response.data;
                    });
                });
                $http({
                    url: baseURL + 'suppliers',
                    method: 'GET',
                    params: {token: $cookies.get('googleToken')}
                }).then(function (response) {
                    $scope.suppliers = response.data;
                });
                $uibModal.open({
                    templateUrl: 'views/modals/editConstruction.html',
                    controller: 'EditConstructionController',
                    scope: $scope
                }).result.then(function (name) {
                    $http({
                        url: baseURL + 'construction/' + $stateParams.construction_id,
                        method: "PUT",
                        params: {
                            token: $cookies.get('googleToken'),
                            name: name,
                            supplier_id: $scope.supplier.id,
                            address: $scope.address,
                            investor: $scope.investor,
                            contractor: $scope.contractor,
                            type: $scope.type,
                            design_type: $scope.design_type,
                            level: $scope.level
                        }
                    }).then(function () {
                        $scope.stateName = name;
                    });
                });
            }
        };
    });
