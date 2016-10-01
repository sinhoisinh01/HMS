angular.module('HMS')
    .controller('NavController', function (baseURL, $cookies, userFactory, constructionFactory, supplierFactory, $http, $state, $stateParams, $rootScope, $scope, $uibModal) {
        if (!$cookies.get('googleToken'))
            $state.go('login');
        $scope.logOut = function () {
            $cookies.remove('googleToken');
            $state.go('login');
        };
        userFactory.getUser().then(function (cache) {
            $scope.user = cache;
        });
		constructionFactory.get().then(function (cache) {
			$scope.constructions = cache;
		});
		supplierFactory.get().then(function (cache) {
			$scope.suppliers = cache;
		});
        if ($state.current.name === 'home')
            $scope.stateName = 'Home';
        else if ($stateParams.name)
            $scope.stateName = $stateParams.name;
        else
			constructionFactory.get($stateParams.construction_id)
                .then(function (constructions) {
                    $scope.stateName = constructions[0].name;
                });
        $scope.deleteUser = function () {
            if (confirm("All of your data will be lost. Are you sure to delete your account?"))
			{	
				userFactory.deleteUser().then(function(response) {
					$scope.logOut();
				});
			}
        };
        $scope.editConstruction = function () {
			if ($stateParams.construction_id) {
                $scope.construction = $scope.constructions.filter(function (con) {
					return con.id == $stateParams.construction_id;
				})[0];
				constructionFactory.get().then(function (cache) {
					$scope.names = cache.map(function (con) {
                        if (con.id !== $scope.construction.id)
                            return con.name;
					});
				});
				supplierFactory.get().then(function (cache) {
					$scope.suppliers = cache;
					$scope.construction.supplier = $scope.suppliers.filter(function (supp) {
						return supp.id == $scope.construction.supplier_id;
					})[0];
				});
				console.log($scope.construction);
                $uibModal.open({
                    templateUrl: 'views/modals/constructionModal.html',
                    scope: $scope
                }).result.then(function (construction) {
                    $scope.stateName = construction.name;
                    $http.post(baseURL + 'construction/' + construction.id,
                        {construction: construction}).then(function () {
                        $scope.constructions.forEach(function (con, i) {
                            if (con.id == construction.id) {
                                construction.updated_at = new Date();
                                $scope.constructions[i] = construction;
                                $scope.recentConstructions = $scope.constructions.sort(function (a, b) {
                                    return new Date(b.updated_at) - new Date(a.updated_at);
                                }).slice(0, 4);
                            }
                        });
                    });
                });
            }
        };
    });
