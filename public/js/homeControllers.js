angular.module('HMS')
    .controller('HomeController', ['$http', 'baseURL', '$scope', '$state', '$uibModal',
        function ($http, baseURL, $scope, $state, $uibModal) {
            $scope.recentConstructions = {};
            $scope.getDateFormat = function (timestamp) {
                return new Date(timestamp);
            };
            $http({
                url: baseURL + 'home',
                method: "GET",
                params: {token: auth2.currentUser.get().hg.id_token}
            }).then(function (response) {
                $scope.recentConstructions = response.data;
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
        }])
    .controller('AddConstructionController', function ($http, baseURL, $scope, $uibModalInstance) {
        $scope.create = function () {
            $http({
                url: baseURL + 'construction',
                method: "GET",
                params: {
                    token: auth2.currentUser.get().hg.id_token,
                    name: $scope.name,
                    supplier_id: $scope.supplier_id,
                    address: $scope.address1 + $scope.address2,
                    investor: $scope.investor,
                    contractor: $scope.contractor,
                    type: $scope.type,
                    design_type: $scope.design_type,
                    level: $scope.level
                }
            }).then(function (response) {
                $uibModalInstance.close(response.data);
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    })
    .controller('AllConstructionsController', function ($http, baseURL, $scope, $uibModalInstance) {
        $scope.allConstructions = {};
        $scope.getDateFormat = function (timestamp) {
            return new Date(timestamp);
        };
        $http({
            url: baseURL + 'home/allConstructions',
            method: "GET",
            params: {token: auth2.currentUser.get().hg.id_token}
        }).then(function (response) {
            $scope.allConstructions = response.data;
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss()
        };
    });