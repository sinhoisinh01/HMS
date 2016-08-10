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
            $scope.worksWindow = {show: false, search: {code: '', name: ''}, top: '', left: '', method: '', categoryWorkEdited: {}};
            /*$scope.inputChanged = function (value) {
             if ($scope.field)
             $scope.worksWindow.search = $scope.categoryWorks[$scope.index][$scope.field] = value;
             };*/
            $scope.cellFocused = function ($event, categoryWorkEdited) {
                $scope.worksWindow.categoryWorkEdited = categoryWorkEdited;
                $scope.worksWindow.method = angular.element($event.target)[0].attributes['ng-model'].value === 'newLine' ? 'Add' : 'Edit';
                $scope.worksWindow.left = angular.element($event.target).prop('offsetLeft') + 'px';
                $scope.worksWindow.top = angular.element($event.target).prop('offsetTop') + angular.element($event.target).prop('offsetHeight') + 'px';
                $scope.worksWindow.show = true;
            };
            $scope.searchWork = function (propriety, value) {
                $scope.worksWindow.search[propriety] = value.replace('<br>', '').replace('&lt;', '<').replace('&gt;', '>');
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
            $scope.replaceValue = function (index, newValue, oldValue) {
                if (isNaN(newValue))
                    $scope.categoryWorks[index].value = oldValue;
                else
                    $http({
                        url: baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $scope.categoryWorks[index].code,
                        method: 'PUT',
                        params: {value: newValue, no:  $scope.categoryWorks[index].no}
                    })
            };
            /*Estimate Table Context Menu*/
            $scope.menuOptions = [
                ['Add New Row', function ($itemScope) {
                    alert("ToDo");
                }],
                null,
                ['Delete Row', function ($itemScope) {
                    $http.delete(baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $itemScope.work.code + "/" + $itemScope.work.no)
                        .then(function () {
                            for (i = $itemScope.$index; i < $scope.categoryWorks.length; i++)
                                $scope.categoryWorks[i].no--;
                            $scope.categoryWorks.splice($itemScope.$index, 1);
                        });
                }]
            ];
        }
    );