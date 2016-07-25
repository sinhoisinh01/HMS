angular.module('HMS')
    .controller('TableNavController', function () {
    })
    .controller('ToolbarController', function () {
    })
    .controller('TableController', function () {
    })
    .controller('CategoriesController', function ($stateParams, $state, $http, baseURL, $scope, $uibModal, $cookies) {
        $scope.categories = [];
        $http({
            url: baseURL + 'construction/' + $stateParams.construction_id,
            method: 'GET',
            params: {token: $cookies.get('googleToken')}
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
		$scope.remove = function (category_id) {
            $http({
				url: baseURL + 'construction/' + $stateParams.construction_id + '/'+ category_id,
				method: 'DELETE',
				params: {token: $cookies.get('googleToken')}
			}).then(function () {
				for (var c in categories)
				{
					if (categories[c].id === category_id)
					{
						delete categories[c];
						break;
					}
				}
			}, function () {
				$cookies.remove('googleToken');
				$state.go('login');
			});
        };
    })
    .controller('AddCategoryController', function ($stateParams, $http, baseURL, $scope, $uibModalInstance, $cookies) {
        $scope.create = function () {
            $http({
                url: baseURL + 'construction/' + $stateParams.construction_id,
                method: "POST",
                params: {token: $cookies.get('googleToken'), name: $scope.name}
            }).then(function (response) {
                $uibModalInstance.close(response.data);
            }, function () {
                //$cookies.remove('googleToken');
                //$state.go('login');
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });