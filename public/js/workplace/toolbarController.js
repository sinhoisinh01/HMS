angular.module('HMS')
    .controller('ToolbarController', function (baseURL, $cookies, $http,$rootScope, $scope, $state, $stateParams) {
        $http.get(baseURL + 'suppliers').then(function (response) {
            $scope.suppliers = response.data;
        });
        $http.get(baseURL + 'construction/' + $stateParams.construction_id)
            .then(function (response) {
                $scope.construction = response.data;
                $http.get(baseURL + 'supplier/' + $scope.construction.supplier_id)
                    .then(function (response) {
                        $rootScope.supplier = response.data;
                    });
            });
        $scope.changeSupplier = function () {
            if (confirm("You are about to change prices of whole construction. Are you sure you want to continue?"))
                $http({
                    url: baseURL + 'construction/' + $stateParams.construction_id,
                    method: 'PUT',
                    params: {
                        name: $scope.construction.name,
                        address: $scope.construction.address,
                        supplier_id: $rootScope.supplier.id,
                        investor: $scope.construction.investor,
                        contractor: $scope.construction.contractor,
                        type: $scope.construction.type,
                        design_type: $scope.construction.design_type,
                        level: $scope.construction.level
                    }
                }).then(function () {}, function () {
                    $rootScope.supplier = $scope.oldValue;
                });
            else
                $rootScope.supplier = $scope.oldValue;
        }
    });
