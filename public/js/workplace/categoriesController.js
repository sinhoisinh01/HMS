angular.module('HMS')
    .controller('CategoriesController', function ($stateParams, $state, $http, baseURL, $scope, $rootScope, $uibModal, $location) {
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
                $http({
                    url: baseURL + 'category/' + id,
                    method: "PUT",
                    params: {name: name}
                }).then(function () {
                    $scope.categories[index].name = name;
                });
            });
        };
        $scope.remove = function (index, category_id) {
            if (confirm("Are you sure you want to delete this category?"))
			{
				$http.delete(baseURL + 'category/' + category_id).then(function () {
					$scope.categories.splice(index, 1);
					if ($location.path().indexOf('category/' + category_id) != -1)
					  $location.path('/construction/' + $stateParams.construction_id);
				});
			}
        };
    });
	