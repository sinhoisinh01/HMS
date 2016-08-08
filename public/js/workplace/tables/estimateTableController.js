angular.module('HMS')
    .controller('estimateTableController', function ($cookies, baseURL, $http, $scope, $stateParams, $rootScope) {
        $scope.tests = [
            {
                category_work: 1,
                code: "AA.111000",
                name: "Xây nhà đá cạnh ao cá",
                amount: "5",
                length: "3",
                width: "4",
                height: "20",
                value: 0,
                unit: "cái",
                price: 500000,
                total: 0
            },
            {
                category_work: 1,
                code: "AB.11310",
                name: "Something",
                amount: "5",
                length: "3",
                width: "4",
                height: "20",
                value: 0,
                unit: "cái",
                price: 500000,
                total: 0
            },
            {
                category_work: 1,
                code: "AA.111000",
                name: "Another things",
                amount: "5",
                length: "3",
                width: "4",
                height: "20",
                value: 0,
                unit: "cái",
                price: 500000,
                total: 0
            }
        ];
        $scope.inputChanged = function (value) {
            if ($scope.index && $scope.field)
                $scope.searchWork = $scope.tests[$scope.index][$scope.field]
                    = $scope.validateValue(value);
        };
        $scope.cellFocused = function (index, field, value) {
            $scope.index = index;
            $scope.field = field;
            $scope.input = $scope.validateValue(value);
        };
        $scope.cellChanged = function (value) {
            $scope.searchWork = $scope.input = $scope.validateValue(value);
        };
        $scope.validateValue = function (value) {
            if (value)
                return isNaN(value) ? value.replace('<br>', '') : parseFloat(value);
        };
        $scope.addCategoryWork = function (workCode){
            $http({
                url: baseURL + 'categoryWork/' + $stateParams.category_id + "/" + workCode,
                method: "POST"
            }).then(function (response) {
               alert(1);
            });
        }        
        if (!$rootScope.works)
            $http.get(baseURL + 'works').then(function (response) {
                $rootScope.works = response.data;
            });
    });