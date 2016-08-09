angular.module('HMS')
    .controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
        $http.get(baseURL + 'categoryWorks/' + $stateParams.category_id)
            .then(function (response) {
                $scope.categoryWorks = response.data;
				console.log(response.data);
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
            for (w in $scope.categoryWorks)
			{
				if ($scope.categoryWorks[w].code == code)
				{
					alert(code + " have already exist!!!");
					return 0;
				}
			}
			$http({
                url: baseURL + 'categoryWork/' + $stateParams.category_id + "/" + code,
                method: "POST"
            }).then(function (response) {
                $scope.categoryWorks = response.data;
            });
        };
		
		/*Estimate Table Context Menu*/
		$scope.menuOptions = [
            ['Add New Row', function ($itemScope) {
                alert("Add new row");
            }],
            null,
            ['Delete Row', function ($itemScope) {
                $http({
					url: baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $itemScope.work.code,
					method: "DELETE"
				}).then(function(response) {
					$scope.categoryWorks = response.data;
				});
            }]
        ];
    });