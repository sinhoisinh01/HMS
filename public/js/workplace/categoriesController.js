angular.module('HMS')
    .controller('CategoriesController', function ($stateParams, $state, $http, baseURL, $scope, $rootScope, $uibModal, $cookies) {
        $scope.categories = [];
		$rootScope.isCollapsedCategories = false;
        $http({
            url: baseURL + 'categories',
            method: 'GET',
            params: {token: $cookies.get('googleToken'), construction_id: $stateParams.construction_id}
        }).then(function (response) {
            $scope.categories = response.data;
        }, function () {
            $cookies.remove('googleToken');
            $state.go('login');
        });
        $scope.add = function () {
            $uibModal.open({
                templateUrl: 'views/modals/addCategory.html',
                controller: 'AddCategoryController'
            }).result.then(function (category) {
                $scope.categories.push(category);
            });
        };
        $scope.edit = function (id, name) {
            $scope.name = name;
            $scope.id = id;
            $scope.oldName = name;
            $uibModal.open({
                templateUrl: 'views/modals/editCategory.html',
                controller: 'EditCategoryController',
                scope: $scope
            }).result.then(function (name) {
                for (var c in $scope.categories) {
                    if ($scope.categories[c].id === $scope.id) {
                        $scope.categories[c].name = name;
                        break;
                    }
                }
            });
        };
        $scope.remove = function (category_id) {
            $http({
                url: baseURL + 'category/' + category_id,
                method: 'DELETE',
                params: {token: $cookies.get('googleToken')}
            }).then(function () {
                for (var c in $scope.categories) {
                    if ($scope.categories[c].id === category_id) {
                        $scope.categories.splice(c, 1);
                        break;
                    }
                }
            }, function () {
                $cookies.remove('googleToken');
                $state.go('login');
            });
        };
    })
    .controller('AddCategoryController', function ($stateParams, $state, $http, baseURL, $scope, $uibModalInstance, $cookies) {
        $scope.create = function () {
            $http({
                url: baseURL + 'category',
                method: "POST",
                params: {token: $cookies.get('googleToken'), name: $scope.name, construction_id: $stateParams.construction_id}
            }).then(function (response) {
                $uibModalInstance.close(response.data);
            }, function () {
                $cookies.remove('googleToken');
                $state.go('login');
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('EditCategoryController', function ($stateParams, $state, $http, baseURL, $scope, $uibModalInstance, $cookies) {
        $scope.edit = function () {
            $http({
                url: baseURL + 'category/' + $scope.id,
                method: "PUT",
                params: {token: $cookies.get('googleToken'), name: $scope.name}
            }).then(function () {
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
	