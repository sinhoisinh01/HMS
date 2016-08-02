angular.module('HMS')
    .controller('HomeController', function ($http, baseURL, $scope, $state, $uibModal, $cookies) {
        $scope.recentConstructions = [];
        $scope.suppliers = [];
        $scope.getDateFormat = function (timestamp) {
            return new Date(timestamp);
        };
        $http({
            url: baseURL + 'constructions',
            method: "GET",
            params: {token: $cookies.get('googleToken')}
        }).then(function (response) {
            $scope.constructions = response.data;
            $scope.recentConstructions = $scope.constructions.sort(function (a, b) {
                return new Date(b.updated_at) - new Date(a.updated_at);
            }).slice(0, 4);
        });
        $scope.add = function () {
            $http({
                url: baseURL + 'suppliers',
                method: 'GET',
                params: {token: $cookies.get('googleToken')}
            }).then(function (response) {
                $scope.suppliers = response.data;
            });
            $uibModal.open({
                templateUrl: 'views/modals/addConstruction.html',
                controller: 'AddConstructionController',
                scope: $scope
            }).result.then(function (construction) {
                $state.go('construction', {'construction_id': construction.id, name: construction.name});
            });
        };
        $scope.viewAll = function () {
            $uibModal.open({
                templateUrl: 'views/modals/allConstructions.html',
                scope: $scope
            });
        };
    })
    .controller('AddConstructionController', function ($http, $state, baseURL, $scope, $uibModalInstance, $cookies) {
        $scope.create = function () {
            $http({
                url: baseURL + 'construction',
                method: "POST",
                params: {
                    token: $cookies.get('googleToken'),
                    name: $scope.name,
                    supplier_id: $scope.supplier.id,
                    address: $scope.address,
                    investor: $scope.investor,
                    contractor: $scope.contractor,
                    type: $scope.type,
                    design_type: $scope.design_type,
                    level: $scope.level
                }
            }).then(function (response) {
                $uibModalInstance.close(response.data);
            }, function () {
                $cookies.remove('googleToken');
                $state.go('login');
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    });