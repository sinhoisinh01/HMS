angular.module('HMS')
    .controller('NavController', function (baseURL, $cookies, $http, $state, $stateParams, $rootScope, $scope, $uibModal) {
        if (!$cookies.get('googleToken'))
            $state.go('login');
        $scope.logOut = function () {
            $cookies.remove('googleToken');
            $state.go('login');
        };
        $http.get(baseURL + 'user').then(function (response) {
            $scope.user = response.data;
        });
        if ($state.current.name === 'home')
            $scope.stateName = 'home';
        else if ($stateParams.name)
            $scope.stateName = $stateParams.name;
        else
            $http.get(baseURL + 'construction/' + $stateParams.construction_id)
                .then(function (response) {
                    $scope.stateName = response.data.name;
                });
        $scope.deleteUser = function () {
            if (confirm("All of your data will be lost. Are you sure to delete your account?"))
				$http.delete(baseURL + 'user').then(function () {
					$scope.logOut();
				});
        };
        $scope.editConstruction = function () {
            if ($stateParams.construction_id) {
                $http.get(baseURL + 'construction/' + $stateParams.construction_id).then(function (response) {
                    $scope.construction = response.data;

                    $http.get(baseURL + 'suppliers').then(function (response) {
                        $scope.suppliers = response.data;
                        $scope.construction.supplier = $scope.suppliers.filter(function (supp) {
                            return supp.id == $scope.construction.supplier_id;
                        })[0];
                    });

                    $http.get(baseURL + 'constructions').then(function (response) {
                        $scope.names = response.data.map(function (con) {
                        if (con.id !== $scope.construction.id)
                            return con.name;
                        });
                    });
                });

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
