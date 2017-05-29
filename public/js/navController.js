angular.module('HMS')
    .controller('NavController', function (baseURL, $cookies, constructionFactory, $filter, $http, $rootScope, supplierFactory, $state, $stateParams, $scope, $uibModal, userFactory, mySweetAlert) {
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
			constructionFactory.getById($stateParams.construction_id)
                .then(function (constructions) {
                    $scope.stateName = constructions[0].name;
                });
        $scope.allConstructions = function () {
            $uibModal.open({
                templateUrl: 'views/modals/allConstructions.html',
                size: 'lg',
                scope: $scope
            });
        };
        $scope.searchConstruction = function(input){
            $rootScope.recentConstructions = $filter('filter')($scope.constructions, {name:input});
            $rootScope.hasSearchResult = true;
        }
        $scope.addConstruction = function () {
            $scope.action = "Tạo mới";
            $scope.names = $scope.constructions.map(function (con) {
                return con.name;
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
                });
            });
        };
        $scope.editConstruction = function () {
			if ($stateParams.construction_id) {
                $scope.construction = $scope.constructions.filter(function (con) {
					return con.id == $stateParams.construction_id;
				})[0];

				$scope.names = $scope.constructions.map(function (con) {
                    if (con.id !== $scope.construction.id)
                        return con.name;
                });

				$scope.construction.supplier = $scope.suppliers.filter(function (supp) {
                        return supp.id == $scope.construction.supplier_id;
                    })[0];
                
                $uibModal.open({
                    templateUrl: 'views/modals/constructionModal.html',
                    scope: $scope
                }).result.then(function (construction) {
                    $scope.stateName = construction.name;
                    construction.supplier_id = construction.supplier.id;
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
        $scope.deleteUser = function () {
            swal(
                mySweetAlert.getType("warning","Tất cả thông tin và công trình của bạn sẽ bị xóa theo"),
                function(isConfirm){
                    if (isConfirm) {
                        userFactory.deleteUser().then(function(response) {
                            $scope.logOut();
                        });
                        swal({
                            title:"Đã xóa",
                            type: "success"
                        });
                    }
                }
            );
        };
        $scope.exportToGoogleSheet = function() {
            console.log($rootScope.construction_id);
            console.log($rootScope.category_id);
            if ($rootScope.construction_id && $rootScope.category_id) {
                modal = $uibModal.open({
                        templateUrl: 'views/modals/exportLoadingModal.html',
                        scope: $scope,
                        size: 'md'
                    });
                $http.get(baseURL + 'export?construction_id=' + $rootScope.construction_id + '&category_id=' +$rootScope.category_id)
                .then(function(response) {
                    window.open(
                      'https://docs.google.com/spreadsheets/d/' + response.data,
                      '_blank' // <- This is what makes it open in a new window.
                    );
                    $rootScope.hasInternetError = false;
                    modal.close();
                }, function(error) {
                    $rootScope.hasInternetError = true;
                    setTimeout(function() { 
                      $rootScope.hasInternetError = false;
                      modal.close();
                    }, 3000);
                });
            }
        }
    });
