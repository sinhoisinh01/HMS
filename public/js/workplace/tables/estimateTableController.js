angular.module('HMS')
    .controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
        $http.get(baseURL + 'categoryWorks/' + $stateParams.category_id)
            .then(function (response) {
                $scope.categoryWorks = response.data;
            });
        $scope.searchWork = {show : false, search : '', top : '', left : ''};
        /*$scope.inputChanged = function (value) {
            if ($scope.field)
                $scope.searchWork.search = $scope.categoryWorks[$scope.index][$scope.field] = value;
        };
        $scope.cellFocused = function (index, field, value) {
            $scope.index = index;
            $scope.field = field;
            $scope.input = value;
        };
        $scope.cellChanged = function (value) {
            $scope.searchWork.search = $scope.input = value.replace('<br>', '');
        };*/
        if (!$rootScope.works)
            $http.get(baseURL + 'works').then(function (response) {
                $rootScope.works = response.data;
            });
        $scope.addWork = function (code) {
            //ToDo
        };
    });