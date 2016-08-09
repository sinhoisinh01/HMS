angular.module('HMS')
    .controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
            $http.get(baseURL + 'categoryWorks/' + $stateParams.category_id)
                .then(function (response) {
                    $scope.categoryWorks = response.data;
                });
            $scope.searchWork = {show: false, search: {code:'',name:''}, top: '', left: ''};
            /*$scope.inputChanged = function (value) {
             if ($scope.field)
             $scope.searchWork.search = $scope.categoryWorks[$scope.index][$scope.field] = value;
             };*/
            $scope.cellFocused = function ($event) {
                $scope.searchWork.show = true;
                $scope.searchWork.left = angular.element($event.target).prop('offsetLeft') + 'px';
                $scope.searchWork.top = angular.element($event.target).prop('offsetTop') + angular.element($event.target).prop('offsetHeight') + 'px';
            };
            $scope.searchReplaceWork = function (type, value) {
                $scope.searchWork.search[type] = value.replace('<br>', '').replace('&lt;', '<').replace('&gt;', '>');
            };
            $scope.searchAddWork = function (value) {
                $scope.searchWork.search = value.replace('<br>', '').replace('&lt;', '<').replace('&gt;', '>');
            };
            $scope.replaceValue = function (index, newValue, oldValue) {
                if(isNaN(newValue))
                    $scope.categoryWorks[index].value = oldValue;
                else
                    $http({
                        url: baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $scope.categoryWorks[index].code,
                        method: 'PUT',
                        params: {value:newValue}
                    }).then(function () {
                        
                    });      
            };
            if (!$rootScope.works)
                $http.get(baseURL + 'works').then(function (response) {
                    $rootScope.works = response.data;
                });
            $scope.addWork = function (work) {
                for (var i in $scope.categoryWorks) {
                    if ($scope.categoryWorks[i].code === work.code) {
                        alert(work.code + " already exist!!!");
                        return;
                    }
                }
                $http.post(baseURL + 'categoryWork/' + $stateParams.category_id + "/" + work.code, {})
                    .then(function () {
                        work.value = work.no = 0;
                        $scope.categoryWorks.push(work);
                    });
            };
            /*Estimate Table Context Menu*/
            $scope.menuOptions = [
                ['Add New Row', function ($itemScope) {
                    alert("ToDo");
                }],
                null,
                ['Delete Row', function ($itemScope) {
                    $http.delete(baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $itemScope.work.code)
                        .then(function () {
                            $scope.categoryWorks.splice($itemScope.$index, 1);
                        });
                }]
            ];
        }
    );