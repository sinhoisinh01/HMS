angular.module('HMS')
    .controller('HomeController', function ($http, baseURL, $scope, $state, $uibModal, $cookies) {
        $scope.recentConstructions = {};
        $scope.getDateFormat = function (timestamp) {
            return new Date(timestamp);
        };
        $http({
            url: baseURL + 'home',
            method: "GET",
            params: {token: $cookies.get('googleToken')}
        }).then(function (response) {
            $scope.recentConstructions = response.data;
        }, function () {
            $cookies.remove('googleToken');
            $state.go('login');
        });
        $scope.add = function () {
            $uibModal.open({
                templateUrl: 'views/modals/addConstruction.html',
                controller: 'AddConstructionController'
            }).result.then(function (construction_id) {
                $state.go('construction', {'construction_id': construction_id});
            });
        };
        $scope.viewAll = function () {
            $uibModal.open({
                templateUrl: 'views/modals/allConstructions.html',
                controller: 'AllConstructionsController'
            }).result.then(function (construction_id) {
                $state.go('construction', {'construction_id': construction_id});
            });
        };
    })
    .controller('AddConstructionController', function ($http, baseURL, $scope, $uibModalInstance, $cookies) {
        $scope.create = function () {
            $http({
                url: baseURL + 'construction',
                method: "GET",
                params: {
                    token: $cookies.get('googleToken'),
                    name: $scope.name,
                    supplier_id: $scope.supplier_id,
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
    })
    .controller('AllConstructionsController', function ($http, baseURL, $scope, $uibModalInstance, $cookies) {
        $scope.allConstructions = {};
        $scope.getDateFormat = function (timestamp) {
            return new Date(timestamp);
        };
        $http({
            url: baseURL + 'home/allConstructions',
            method: "GET",
            params: {token: $cookies.get('googleToken')}
        }).then(function (response) {
            $scope.allConstructions = response.data;
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss()
        };
    });