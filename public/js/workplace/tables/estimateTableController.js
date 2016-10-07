angular.module('HMS')
    .controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope, workFactory) {
            $scope.subCategories = false;
            if (!$scope.works)
            {
                workFactory.get()
                .then(function(result){
                    $scope.works = result;
                })
                .then(function(){
                    $http.get(baseURL + 'categoryWorks',{params:{category_id:$stateParams.category_id}})
                    .then(function (response) {        
                        var temp = response.data.sort(function(a,b){
                            return a.no - b.no;
                        });
                        for(var i=0; i<temp.length; i++)
                        {
                            temp[i].subcategory_works.sort(function(a,b){
                                return a.no - b.no;
                            })

                            for(var j=0; j<temp[i].subcategory_works.length; j++)
                            {
                                temp[i].subcategory_works[j].descriptions.sort(function(a,b){
                                    return a.no - b.no;
                                });

                                var work = $scope.works[temp[i].subcategory_works[j].work_id-1];
                                // array index starts from 0, work id starts from 1
                                temp[i].subcategory_works[j].code = work.code;
                                temp[i].subcategory_works[j].name = work.name;
                                temp[i].subcategory_works[j].unit = work.unit;
                                 temp[i].subcategory_works[j].price = work.price;
                            }
                        }
                        $scope.subCategories = temp;  
                        $scope.showCategoryWorks = true; 
                    });
                })
                ;
            }   
            $scope.worksWindow = {
                show: false,
                search: {code: '', name: '', $: ''},
                top: '',
                left: '',
                method: '',
                oldId: '',
                oldName: '',
                newWork: {}
            };
			$scope.newDes = {};
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
                    oldId: categoryWorkEdited ? categoryWorkEdited.code : '',
                    oldName: categoryWorkEdited ? categoryWorkEdited.name : '',
                    newWork: null
                };
            };
            $scope.searchWork = function (property, value) {
                $scope.worksWindow.search[property] = value;
            };
            $scope.addWork = function (work) {
                $scope.worksWindow.newWork = work;
                $http.post(baseURL + "subcategoryWork", {subcategoryWork:subCategoryWork}).then(function(){
                    console.log('success!');
                });
            };
            /*$scope.cellBlured = function (index) {
                if ($scope.worksWindow.newWork) {
                    for (var i in $scope.categoryWorks) {
                        if ($scope.categoryWorks[i].id === $scope.worksWindow.newWork.id) {
                            alert($scope.worksWindow.newWork.code + " already exist!!!");
                            $scope.worksWindow.show = false;
                            return;
                        }
                    }
                    if ($scope.worksWindow.oldId)
                        $http.post(baseURL + 'categoryWork/' + $stateParams.category_id + "/"
                            + $scope.worksWindow.oldId + "/" + $scope.worksWindow.newWork.code, {})
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
                    $scope.categoryWorks[index].code = $scope.worksWindow.oldId;
                    //console.log($scope.categoryWorks[index].name);
                }
                $scope.worksWindow.show = false;
            };
            */
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
			
			$scope.calculateValue = function(index) {
				/*if ($scope.categoryWorks[index].descriptions)
				{
					
				}*/
			};
			
			$scope.calculateDesValue = function() {
			  var value = 1;
			  if ($scope.newDes.amount && $scope.newDes.amount != 0) 
				value *= $scope.newDes.amount;
			  if ($scope.newDes.length && $scope.newDes.length != 0) 
				value *= $scope.newDes.length;
			  if ($scope.newDes.width && $scope.newDes.width != 0) 
				value *= $scope.newDes.width;
			  if ($scope.newDes.height && $scope.newDes.height != 0) 
				value *= $scope.newDes.height;
			  if (value==1) value = '';
			  return value;
			};
			
			$scope.addDescription = function(e, index) {
				if (e.keyCode == 13)
				{
					var description = $scope.newDes;
					description.category_id = $stateParams.category_id;
					description.work_code = $scope.categoryWorks[index].work_code;
					$http.post(baseURL + 'descriptions', {description:description})
						.then(function () {
						  $scope.categoryWorks[index].descriptions.push($scope.newDes);
						  $scope.newDes = {};
						});
				}
			};
			
            /*Estimate Table Context Menu*/
            $scope.menuOptions = [
				['Add Descriptions', function ($itemScope) {
                    $itemScope.categoryWork.addDescriptions = true;
                }],
                null,
                ['Delete Row', function ($itemScope) {
                    if ($itemScope.des) {
						$http.delete(baseURL + 'descriptions/' + $stateParams.category_id + '/' + $itemScope.des.work_code + '/' + $itemScope.des.content, {})
						.then(function () {
						  $itemScope.categoryWork.descriptions
							.forEach(function(element, index) {
								if (element.content === $itemScope.des.content)
								{
									$itemScope.categoryWork.descriptions.splice(index, 1);
								}
							});
						});
					}
					else {
						$http.delete(baseURL + 'categoryWork/' + $stateParams.category_id + "/" + $itemScope.categoryWork.code, {no: $itemScope.categoryWork.no})
							.then(function () {
								for (i = $itemScope.$index; i < $scope.categoryWorks.length; i++)
									$scope.categoryWorks[i].no--;
								$scope.categoryWorks.splice($itemScope.$index, 1);
							});
					}
                }]
            ];
        }
    );