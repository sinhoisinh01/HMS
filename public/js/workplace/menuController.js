angular.module('HMS')
    .controller('MenuController', function ($http, baseURL, $rootScope, $stateParams, $scope, $uibModal) {
        $scope.collapseCategories = function() {
            $rootScope.isCollapsedCategories = !$rootScope.isCollapsedCategories;
        };
		$scope.add = function () {
            $http.get(baseURL + 'suppliers').then(function (response) {
                $scope.suppliers = response.data;
            });
            $uibModal.open({
                templateUrl: 'views/modals/addConstruction.html',
                controller: 'AddConstructionController',
                scope: $scope
            }).result.then(function (construction) {
                $state.go('construction', {'construction_id': construction.id, name:construction.name });
            });
        };
		$scope.viewAll = function () {
            $http.get(baseURL + 'constructions').then(function (response) {
                $scope.constructions = response.data;
            });
            $uibModal.open({
                templateUrl: 'views/modals/allConstructions.html',
                scope: $scope
            });
        };
    });
    
