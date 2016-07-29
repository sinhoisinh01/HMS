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
                value: "",
                unit: "cái",
                price: "500000",
                total: ""
            },
            {
                id: 1,
                work_id: "AB.11310",
                name: "Something",
                amount: "5",
                length: "3",
                width: "4",
                height: "20",
                value: "",
                unit: "cái",
                price: "500000",
                total: ""
            },
            {
                id: 2,
                work_id: "AA.111000",
                name: "Another things",
                amount: "5",
                length: "3",
                width: "4",
                height: "20",
                value: "",
                unit: "cái",
                price: "500000",
                total: ""
            },
            {
                id: 3,
                work_id: "AB.11310",
                name: "More things",
                amount: "5",
                length: "3",
                width: "4",
                height: "20",
                value: "",
                unit: "cái",
                price: "500000",
                total: ""
            },
            {
                id: 4,
                work_id: "AB.11310",
                name: "More things",
                amount: "5",
                length: "3",
                width: "4",
                height: "20",
                value: "",
                unit: "cái",
                price: "500000",
                total: ""
            },
            {
                id: 5,
                work_id: "AB.11310",
                name: "More things",
                amount: "5",
                length: "3",
                width: "4",
                height: "20",
                value: "",
                unit: "cái",
                price: "500000",
                total: ""
            },
            {
                work_id: "AB.11310",
                name: "More things",
                amount: "5",
                length: "3",
                width: "4",
                height: "20",
                value: "",
                unit: "cái",
                price: "500000",
                total: ""
            }
        ];
        $scope.inputChanged = function (value) {
            $scope.tests[$scope.index][$scope.field] = value;
        };
        $scope.cellFocused = function (index, field, value) {
            $scope.index = index;
            $scope.field = field;
            $scope.input = value;
        };
        $scope.cellChanged = function (value) {
            $scope.input = value;
        };
        // works are put in rootScope because they never change
        // and in this way we can call it only once
        if (!$rootScope.works)
            $http({
                url: baseURL + 'works',
                method: "GET",
                params: {token: $cookies.get('googleToken')}
            }).then(function (response) {
                $rootScope.works = response.data;
                console.log('http');
            });
    });