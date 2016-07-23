angular.module('HMS')
    .controller('TableNavController', function () {
    })
    .controller('ToolbarController', function () {
    })
    .controller('TableController', function () {
    })
    .controller('CategoriesController', function ($stateParams, $http, baseURL, $scope, $uibModal, $cookies) {
        $scope.categories = [];
        $http({
            url: baseURL + 'construction/' + $stateParams.construction_id,
            method: 'GET',
            params: {token: $cookies.get('googleToken')}
        }).then(function (response) {
            $scope.categories = response.data;
        });
        $scope.add = function () {
            $uibModal.open({
                templateUrl: 'views/modals/addCategory.html',
                controller: 'AddCategoryController'
            }).result.then(function (category) {
                $scope.categories.push(category);
            });
        };
    })
    .controller('AddCategoryController', function ($stateParams, $http, baseURL, $scope, $uibModalInstance, $cookies) {
        $scope.create = function () {
            $http({
                url: baseURL + 'construction/' + $stateParams.construction_id + '/' + $scope.name,
                method: "GET",
                params: {token: $cookies.get('googleToken')}
            }).then(function (response) {
                $uibModalInstance.close(response.data);
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });