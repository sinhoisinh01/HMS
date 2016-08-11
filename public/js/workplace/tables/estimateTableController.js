angular.module('HMS')
    .controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
            $http.get(baseURL + 'categoryWorks/' + $stateParams.category_id)
                .then(function (response) {
                    $scope.categoryWorks = response.data.sort(function (a, b) {
                        return a.no - b.no
                    });
                });
            if (!$rootScope.works)
                $http.get(baseURL + 'works').then(function (response) {
                    $rootScope.works = response.data;
                });
            $scope.worksWindow = {
                show: false,
                search: {code: '', name: ''},
                top: '',
                left: '',
                method: '',
                categoryWorkEdited: {}
            };
            /*$scope.inputChanged = function (value) {
             if ($scope.field)
             $scope.worksWindow.search = $scope.categoryWorks[$scope.index][$scope.field] = value;
             };*/
            $scope.cellFocused = function ($event, categoryWorkEdited) {
                var cell = angular.element($event.target);
                $scope.worksWindow = {
                    show: true,
                    search: {code: '', name: ''},
                    top: cell.prop('offsetTop') + cell.prop('offsetHeight') + 'px',
                    left: cell.prop('offsetLeft') + 'px',
                    method: cell[0].attributes['ng-model'].value === 'newLine' ? 'Add' : 'Edit',
                    categoryWorkEdited: categoryWorkEdited
                };
            };
            $scope.searchWork = function (propriety, value) {
                $scope.worksWindow.search[propriety] = value;
            };
            $scope.addWork = function (work) {
                for (var i in $scope.categoryWorks) {
                    if ($scope.categoryWorks[i].code === work.code) {
                        alert(work.code + " already exist!!!");
                        return;
                    }
                }
                if ($scope.worksWindow.categoryWorkEdited)
                    $http.post(baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $scope.worksWindow.categoryWorkEdited.code + "/" + work.code, {})
                        .then(function (response) {
                            $scope.categoryWorks[$scope.worksWindow.categoryWorkEdited.no - 1] = response.data;
                        });
                else
                    $http.post(baseURL + 'categoryWork/' + $stateParams.category_id + "/" + work.code, {})
                        .then(function (response) {
                            $scope.categoryWorks.push(response.data);
                        });
            };
            $scope.replaceValue = function (index, oldValue) {
                if (isNaN($scope.categoryWorks[index].value))
                    $scope.categoryWorks[index].value = oldValue;
                else
                    $http({
                        url: baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $scope.categoryWorks[index].code,
                        method: 'PUT',
                        params: {value: $scope.categoryWorks[index].value, no: $scope.categoryWorks[index].no}
                    })
            };
            /*Estimate Table Context Menu*/
            $scope.menuOptions = [
                ['Add New Row', function ($itemScope) {
                    alert("ToDo");
                }],
                null,
                ['Delete Row', function ($itemScope) {
                    $http.delete(baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $itemScope.categoryWork.code, {no: $itemScope.categoryWork.no})
                        .then(function () {
                            for (i = $itemScope.$index; i < $scope.categoryWorks.length; i++)
                                $scope.categoryWorks[i].no--;
                            $scope.categoryWorks.splice($itemScope.$index, 1);
                        });
                }]
            ];
        }
    );