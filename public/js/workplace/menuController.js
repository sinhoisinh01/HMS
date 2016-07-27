angular.module('HMS')
    .controller('MenuController', function ($rootScope, $stateParams, $scope, $uibModal) {
        $rootScope.constructionName = $stateParams.name;
        $scope.collapseCategories = function() {
            $rootScope.isCollapsedCategories = !$rootScope.isCollapsedCategories;
        };
		$scope.add = function () {
            $uibModal.open({
                templateUrl: 'views/modals/addConstruction.html',
                controller: 'AddConstructionController'
            }).result.then(function (construction) {
                $state.go('construction', {'construction_id': construction.id, name:construction.name });
            });
        };
		$scope.viewAll = function () {
            $uibModal.open({
                templateUrl: 'views/modals/allConstructions.html',
                controller: 'AllConstructionsController'
            }).result.then(function (construction_id) {
                $state.go('construction', {'construction_id': construction_id});
            });
        };
    });
