angular.module('HMS')
    .controller('estimateTableController', function ($cookies, baseURL, $http, $scope, $rootScope) {
        $scope.input = $scope.index = $scope.field = '';
        $scope.tests = [
            {
                id: 15,
                work_id: "AA.111000",
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
                id: 1,
                work_id: "AB.11310",
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
                id: 2,
                work_id: "AA.111000",
                name: "Another things",
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
                id: 3,
                work_id: "AB.11310",
                name: "More things",
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
                id: 4,
                work_id: "AB.11310",
                name: "More things",
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
                id: 5,
                work_id: "AB.11310",
                name: "More things",
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
                work_id: "AB.11310",
                name: "More things",
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
            $scope.tests[$scope.index][$scope.field] = $scope.validateValue(value);
        };
        $scope.cellFocused = function (index, field, value) {
            $scope.index = index;
            $scope.field = field;
            $scope.input = $scope.validateValue(value);
        };
        $scope.cellChanged = function (value) {
            $scope.input = $scope.validateValue(value);
        };
        $scope.validateValue = function (value) {
            if (isNaN(value))
                value = value.replace('<br>', '');
            else
                value = parseFloat(value);
            return value;
        };
       
        if (!$rootScope.works)
            $http.get(baseURL + 'works').then(function (response) {
                $rootScope.works = response.data;
            });
    });