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
                $http.post(baseURL + 'category', {name: name, construction_id: $stateParams.construction_id})
                    .then(function (response) {
                        $scope.categories.push(response.data);
                    });
            });
        };
        $scope.edit = function (index, id, name) {
            $scope.name = $scope.oldName = name;
            $uibModal.open({
                templateUrl: 'views/modals/editCategory.html',
                scope: $scope
            }).result.then(function (name) {
                $http.put(baseURL + 'category/' + id, {name: name}).then(function () {
                    $scope.categories[index].name = name;
                });
            });
        };
        $scope.remove = function (index, category_id) {
            $http.delete(baseURL + 'category/' + category_id).then(function () {
                $scope.categories.splice(index, 1);
            });
        };
    });
	