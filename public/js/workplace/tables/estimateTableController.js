angular.module('HMS')
    .controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
            $http.get(baseURL + 'categoryWorks/' + $stateParams.category_id)
                .then(function (response) {
                    $scope.categoryWorks = response.data.sort(function (a, b) {
                        return a.no - b.no
                    });
					console.log($scope.categoryWorks);
                });
            if (!$rootScope.works)
                $http.get(baseURL + 'works').then(function (response) {
                    $rootScope.works = response.data;
                });
            $scope.worksWindow = {
                show: false,
                search: {code: '', name: '', $: ''},
                top: '',
                left: '',
                method: '',
                oldCode: '',
                oldName: '',
                newWork: {}
            };
            /*$scope.inputChanged = function (value) {
             if ($scope.field)
             $scope.worksWindow.search = $scope.categoryWorks[$scope.index][$scope.field] = value;
             };*/
            $scope.cellFocused = function ($event, categoryWorkEdited) {
                var cell = angular.element($event.target);
                $scope.worksWindow = {
                    show: true,
                    search: {code: '', name: '', $: ''},
                    top: (cell.prop('offsetParent').offsetTop
					+ cell.prop('offsetParent').offsetHeight) + 'px',
                    left: cell.prop('offsetParent').offsetLeft + 'px',
                    method: categoryWorkEdited ? 'Edit' : 'Add',
                    oldCode: categoryWorkEdited ? categoryWorkEdited.code : '',
                    oldName: categoryWorkEdited ? categoryWorkEdited.name : '',
                    newWork: null
                };
            };
            $scope.searchWork = function (property, value) {
                $scope.worksWindow.search[property] = value;
            };
            $scope.addWork = function (work) {
                $scope.worksWindow.newWork = work;
            };
            $scope.cellBlured = function (index) {
                if ($scope.worksWindow.newWork) {
                    for (var i in $scope.categoryWorks) {
                        if ($scope.categoryWorks[i].code === $scope.worksWindow.newWork.code) {
                            alert($scope.worksWindow.newWork.code + " already exist!!!");
                            $scope.worksWindow.show = false;
                            return;
                        }
                    }
                    if ($scope.worksWindow.oldCode)
                        $http.post(baseURL + 'categoryWork/' + $stateParams.category_id + "/"
                            + $scope.worksWindow.oldCode + "/" + $scope.worksWindow.newWork.code, {})
                            .then(function (response) {
                                $scope.categoryWorks[index] = response.data;
                            });
                    else
                        $http.post(baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $scope.worksWindow.newWork.code, {})
                            .then(function (response) {
                                $scope.categoryWorks.push(response.data);
                            });
                } else if (index !== null) {
                    $scope.categoryWorks[index].name = $scope.worksWindow.oldName;
                    $scope.categoryWorks[index].code = $scope.worksWindow.oldCode;
                    //console.log($scope.categoryWorks[index].name);
                }
                $scope.worksWindow.show = false;
            };
            $scope.focusReplaceValue = function (index) {
                $scope.categoryWorks[index].oldValue = $scope.categoryWorks[index].value;
            };
            $scope.replaceValue = function (index) {
                if (isNaN($scope.categoryWorks[index].value))
                    $scope.categoryWorks[index].value = $scope.categoryWorks[index].oldValue;
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