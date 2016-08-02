angular.module('HMS')
    .controller('ToolbarController', function (baseURL, $cookies, $http, $scope, $state, $stateParams) {
        $http({
            url: baseURL + 'suppliers',
            method: 'GET',
            params: {token: $cookies.get('googleToken')}
        }).then(function (response) {
            $scope.suppliers = response.data;
        });
        $http({
            url: baseURL + 'construction/' + $stateParams.construction_id,
            method: 'GET',
            params: {token: $cookies.get('googleToken')}
        }).then(function (response) {
            $scope.construction = response.data;
            $http({
                url: baseURL + 'supplier/' + $scope.construction.supplier_id,
                method: 'GET',
                params: {token: $cookies.get('googleToken')}
            }).then(function (response) {
                $scope.supplier = response.data;

            });
        });
        $scope.changeSupplier = function () {
            if (confirm("You are about to change prices of whole construction. Are you sure you want to continue?"))
                $http({
                    url: baseURL + 'construction/' + $stateParams.construction_id,
                    method: 'PUT',
                    params: {
                        token: $cookies.get('googleToken'),
                        name: $scope.construction.name,
                        address: $scope.construction.address,
                        supplier_id: $scope.supplier.id,
                        investor: $scope.construction.investor,
                        contractor: $scope.construction.contractor,
                        type: $scope.construction.type,
                        design_type: $scope.construction.design_type,
                        level: $scope.construction.level
                    }
                }).then(function () {
                }, function () {
                    $scope.supplier = $scope.oldValue;
                });
            else
                $scope.supplier = $scope.oldValue;
        }
    });
