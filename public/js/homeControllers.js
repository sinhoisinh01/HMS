angular.module('HMS')
    .controller('HomeController', function ($http, baseURL, $scope, $state, $uibModal) {
        $scope.getDateFormat = function (timestamp) {
            return new Date(timestamp);
        };
        $http.get(baseURL + 'constructions').then(function (response) {
            $scope.constructions = response.data;
            $scope.recentConstructions = $scope.constructions.sort(function (a, b) {
                return new Date(b.updated_at) - new Date(a.updated_at);
            }).slice(0, 4);
        });
        $scope.add = function () {
            $http.get(baseURL + 'suppliers').then(function (response) {
                $scope.suppliers = response.data;
            });
            $uibModal.open({
                templateUrl: 'views/modals/addConstruction.html',
                controller: 'AddConstructionController',
                scope: $scope
            }).result.then(function (construction) {
                $state.go('construction', {'construction_id': construction.id, name: construction.name});
            });
        };
		$scope.remove = function (construction_id) {
			var c = confirm("Are you sure to delete this Construction?");
			if (c == true)
			{
				$http.delete(baseURL + 'construction/' + construction_id).then(function() {
					for (var con in $scope.recentConstructions) {
						if ($scope.recentConstructions[con].id === construction_id) {
							$scope.recentConstructions.splice(con, 1);
							break;
						}
					}
					for (var con in $scope.constructions) {
						if ($scope.constructions[con].id === construction_id) {
							$scope.constructions.splice(con, 1);
							break;
						}
					}
				});
				console.log($scope.constructions + '; con_id:' + construction_id);
			}
		};
        $scope.viewAll = function () {
            $uibModal.open({
                templateUrl: 'views/modals/allConstructions.html',
                scope: $scope
            });
        };
    })
    .controller('AddConstructionController', function ($http, $state, baseURL, $scope, $uibModalInstance) {
        $scope.create = function () {
            $http({
                url: baseURL + 'construction',
                method: "POST",
                params: {
                    name: $scope.name,
                    supplier_id: $scope.supplier.id,
                    address: $scope.address,
                    investor: $scope.investor,
                    contractor: $scope.contractor,
                    type: $scope.type,
                    design_type: $scope.design_type,
                    level: $scope.level
                }
            }).then(function (response) {
                $uibModalInstance.close(response.data);
            });
        };
    });