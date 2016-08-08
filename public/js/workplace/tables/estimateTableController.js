angular.module('HMS')
    .controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
        $http.get(baseURL + 'categoryWorks/' + $stateParams.category_id)
			.then(function(response) {
				$scope.categoryWorks = response.data;
				console.log($scope.categoryWorks);
			});
        $scope.inputChanged = function (value) {
            if ($scope.field) 
                $scope.searchWork = $scope.categoryWorks[$scope.index][$scope.field]
                    = $scope.validateValue(value);
        };
        $scope.cellFocused = function (index, field, value) {
            $scope.index = index;
            $scope.field = field;
            $scope.input = $scope.validateValue(value);
			//console.log('[' + $scope.index + '][' + $scope.field + ']');
        };
        $scope.cellChanged = function (value) {
            $scope.searchWork = $scope.input = $scope.validateValue(value);
        };
        $scope.validateValue = function (value) {
            if (value)
                return isNaN(value) ? value.replace('<br>', '') : parseFloat(value);
        };
        if (!$rootScope.works)
            $http.get(baseURL + 'works').then(function (response) {
                $rootScope.works = response.data;
            });
    });