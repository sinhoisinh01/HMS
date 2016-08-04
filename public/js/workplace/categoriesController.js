angular.module('HMS')
    .controller('CategoriesController', function ($stateParams, $state, $http, baseURL, $scope, $rootScope, $uibModal) {
        $rootScope.isCollapsedCategories = false;
        $http.get(baseURL + 'categories/' + $stateParams.construction_id)
            .then(function (response) {
                $scope.categories = response.data;
            });
        $scope.add = function () {
            $uibModal.open({
                templateUrl: 'views/modals/addCategory.html'
            }).result.then(function (name) {
                $http({
                    url: baseURL + 'category',
                    method: "POST",
                    params: {
                        name: name,
                        construction_id: $stateParams.construction_id
                    }
                }).then(function (response) {
                    $scope.categories.push(response.data);
                });
            });
        };
        $scope.edit = function (id, name) {
            $scope.name = name;
            $scope.oldName = name;
            $uibModal.open({
                templateUrl: 'views/modals/editCategory.html',
                scope: $scope
            }).result.then(function (name) {
                $http({
                    url: baseURL + 'category/' + id,
                    method: "PUT",
                    params: {name: name}
                });
                for (var c in $scope.categories) {
                    if ($scope.categories[c].id === $scope.id) {
                        $scope.categories[c].name = name;
                        break;
                    }
                }
            });
        };
        $scope.remove = function (category_id) {
            $http.delete(baseURL + 'category/' + category_id).then(function () {
                for (var c in $scope.categories) {
                    if ($scope.categories[c].id === category_id) {
                        $scope.categories.splice(c, 1);
                        break;
                    }
                }
            });
        };
    });
	