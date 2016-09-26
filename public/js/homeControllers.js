angular.module('HMS')
    .controller('HomeController', function ($http, baseURL, $scope, $state, $uibModal, $timeout, constructionFactory) {
        $scope.getDateFormat = function (timestamp) {
            return new Date(timestamp);
        };

		constructionFactory.getConstructions().then(function(cache) {
			$scope.constructions = cache;
			$scope.recentConstructions = $scope.constructions.sort(function (a, b) {
				return new Date(b.updated_at) - new Date(a.updated_at);
			}).slice(0, 4);
		});

        $scope.add = function () {
            $scope.construction = undefined;
            $scope.names = $scope.constructions.map(function (con) {
                return con.name;
            });
            $http.get(baseURL + 'suppliers').then(function (response) {
                $scope.suppliers = response.data;
            });
            $uibModal.open({
                templateUrl: 'views/modals/constructionModal.html',
                scope: $scope
            }).result.then(function (construction) {
                construction.supplier_id = construction.supplier.id;
				delete construction.supplier;
                $http.post('construction', {construction: construction}).then(function (response) {
                    $state.go('construction', {'construction_id': response.data.id, name: response.data.name});
                });
            });
        };
        $scope.edit = function (construction) {
            $scope.construction = angular.copy(construction);
            $scope.names = $scope.constructions.map(function (con) {
                if (con.id !== construction.id)
                    return con.name;
            });
            $http.get(baseURL + 'suppliers').then(function (response) {
                $scope.suppliers = response.data;
                $scope.construction.supplier = $scope.suppliers.filter(function (supp) {
                    return supp.id == construction.supplier_id;
                })[0];
            });
            $uibModal.open({
                templateUrl: 'views/modals/constructionModal.html',
                scope: $scope
            }).result.then(function (construction) {
                construction.supplier_id = construction.supplier.id;
				delete construction.supplier;
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
        };
        $scope.remove = function (construction_id) {
            $timeout(function () { //confirm occur some problems on firefox
                if (confirm("Are you sure to delete this construction?"))
                    $http.delete(baseURL + 'construction/' + construction_id).then(function () {
                        $scope.constructions = $scope.constructions.filter(function (con) {
                            return con.id !== construction_id;
                        });
                        $scope.recentConstructions = $scope.constructions.sort(function (a, b) {
                            return new Date(b.updated_at) - new Date(a.updated_at);
                        }).slice(0, 4);
                    });
            });
        };
        $scope.viewAll = function () {
            $uibModal.open({
                templateUrl: 'views/modals/allConstructions.html',
                size: 'lg',
                scope: $scope
            });
        };
    });