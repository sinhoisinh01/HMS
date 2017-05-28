angular.module('HMS')
    .controller('HomeController', function ($http, baseURL, $rootScope, $scope, $state, $uibModal, constructionFactory, supplierFactory, mySweetAlert) {
        $scope.showConstructions = false;

		$scope.getDateFormat = function (timestamp) {
            return new Date(timestamp);
        };
        constructionFactory.get().then(function (cache) {
			$scope.constructions = cache;
            $rootScope.recentConstructions = cache.sort(function (a, b) {
				return new Date(b.updated_at) - new Date(a.updated_at);
			}).slice(0, 4);
			$scope.showConstructions = true;
		});
		supplierFactory.get().then(function (cache) {
			$scope.suppliers = cache;
		});
        
         $scope.add = function () {
            $scope.construction = undefined;
            $scope.action = "Tạo mới";
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
                $uibModal.open({
                    templateUrl: 'views/modals/loadingModal.html',
                    scope: $scope,
                    size: 'md'
                });

                // table 'constructions' doesn't have supplier column (just supplier_id)
                construction.supplier_id = construction.supplier.id;
                delete construction.supplier;
                constructionFactory.post(construction).then(function (construction) {
                    $state.go('construction', {construction_id: construction.id, name: construction.name});
                },
                function(error) {
                    $rootScope.hasInternetError = true;
                });
            });
        };
        $scope.edit = function (construction) {
            $scope.action = "Cập nhật";
            $scope.construction = angular.copy(construction);
            $scope.names = $scope.constructions.map(function (con) {
                if (con.id !== construction.id)
                    return con.name;
            });
			supplierFactory.getById(construction.supplier_id).then(function (cache) {
                $scope.construction.supplier = cache[0];
            });
            $uibModal.open({
                templateUrl: 'views/modals/constructionModal.html',
                scope: $scope
            }).result.then(function (construction) {
                construction.supplier_id = construction.supplier.id;
				$scope.showConstructions = false;
                constructionFactory.put(construction).then(function () {
					$scope.showConstructions = true;
				});
				$scope.constructions.forEach(function (con, i) {
					if (con.id == construction.id) {
						construction.updated_at = new Date();
						$scope.constructions[i] = construction;
					}
				});
				$scope.recentConstructions = $scope.constructions.sort(function (a, b) {
					return new Date(b.updated_at) - new Date(a.updated_at);
				}).slice(0, 4);
            });
        };
        $scope.remove = function (construction_id) {          
            swal(
                mySweetAlert.getType("warning","Tất cả hạng mục sẽ bị xóa theo"),
                function(isConfirm){
                    if (isConfirm) {
                        $scope.showConstructions = false;
                        constructionFactory.delete(construction_id).then(function () {
                            $scope.showConstructions = true;
                        });
                        $scope.constructions = $scope.constructions.filter(function (con) {
                            return con.id !== construction_id;
                        });
                        $scope.recentConstructions = $scope.constructions.sort(function (a, b) {
                            return new Date(b.updated_at) - new Date(a.updated_at);
                        }).slice(0, 4);
                        
                        swal({
                            title:"Đã xóa",
                            type: "success"
                        });
                    }
                }
            );
            
            
        }
        /*$scope.viewAll = function() {
            $uibModal.open({
                templateUrl: 'views/modals/allConstructions.html',
                size: 'lg',
                scope: $scope
            });
        };*/

    });