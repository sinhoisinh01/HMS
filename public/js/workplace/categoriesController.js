angular.module('HMS')
    .controller('CategoriesController', function ($stateParams, $state, $http, baseURL, $scope, $uibModal, $rootScope, $location) {
        $rootScope.isCollapsedCategories = false;
        $http.get(baseURL + 'categories/' + $stateParams.construction_id)
            .then(function (response) {
                $scope.categories = response.data;
            });
        $scope.add = function () {
            $scope.names = $scope.categories.map(function (cat) {
                return cat.name;
            });
            $uibModal.open({
                templateUrl: 'views/modals/categoryModal.html',
                scope: $scope
            }).result.then(function (name) {
                $http.post(baseURL + 'category', {name: name, construction_id: $stateParams.construction_id})
                    .then(function (response) {
                        $scope.categories.push(response.data);
                    });
            });
        };
        $scope.edit = function (index) {
            $scope.name = $scope.categories[index].name;
            $scope.names = $scope.categories.map(function (cat) {
                return cat.name;
            });
            $uibModal.open({
                templateUrl: 'views/modals/categoryModal.html',
                scope: $scope
            }).result.then(function (name) {
                $http.post(baseURL + 'category/' + $scope.categories[index].id,
                    {name: name}).then(function () {
                    $scope.categories[index].name = name;
                });
            });
        };
        $scope.remove = function (index) {
            if (confirm("Are you sure you want to delete this category?"))
                $http.delete(baseURL + 'category/' + $scope.categories[index].id).then(function () {
                    if ($location.path().indexOf('category/' + $scope.categories[index].id) != -1)
                        $location.path('construction/' + $stateParams.construction_id);
                    $scope.categories.splice(index, 1);
                });
        };
    });
	