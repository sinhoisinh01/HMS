angular.module('HMS')
    .controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope, workFactory) 
    {
        $scope.subCategories = false;
		$scope.estimateSheet = [];
        /* 1 dimensional array used to store all subcategories, subcategory works, descriptions in correct order*/

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
                        });
						
						temp[i].code = "*";// add '*' as code of subcategory
						temp[i].subcategory_id = temp[i].id;
                        $scope.estimateSheet.push(temp[i]);

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
							temp[i].subcategory_works[j].totalPrice = temp[i].subcategory_works[j].value * work.price;

							$scope.estimateSheet.push(temp[i].subcategory_works[j]);
							
							if (temp[i].subcategory_works[j].descriptions)
								for (var k=0; k<temp[i].subcategory_works[j].descriptions.length; k++)
								{
                                    temp[i].subcategory_works[j].descriptions[k].subcategory_id = temp[i].id; 
									$scope.estimateSheet.push(temp[i].subcategory_works[j].descriptions[k]);
								}
                        }
                    }
                    $scope.subCategories = temp;  
                    $scope.showCategoryWorks = true;
					
					var blankRowNum = 150 - $scope.estimateSheet.length;
					for (var i=0; i<blankRowNum; i++)
					{
						$scope.estimateSheet.push({});
					}//problem?
                });
            });
        }  

        $scope.worksWindow = {
            show: false,
            search: '',
            method: '',
            oldId: '',
            oldName: '',
            newWork: {}
        };

        $scope.getRowPos = function(index){
            $scope.rowPos = index;
        }

		$scope.cellBlured = function(row) {
            var addType = '';
            if(row.code === undefined)
                row.code = "";
			if(/^[*]+$/.test(row.code))
                 addType = 'subcategory';
            else if(/[a-zA-Z0-9.,]/.test(row.code))
            {
                if(/^TT.*/i.test(row.code)) 
                    addType = 'user-work';
                else addType = 'work';
            }
            else if(row.code === '')
                addType = 'description';
            
            if(addType == 'subcategory')
            {
                var subcategory = {category_id:$stateParams.category_id, name:$scope.estimateSheet[$scope.rowPos].name, no: null};
                for(var i = $scope.rowPos-1; i>=0; i--)
                {
                    if($scope.estimateSheet[i].code && $scope.estimateSheet[i].code.charAt(0) == '*')
                    {
                        subcategory.no = $scope.estimateSheet[i].no + 1;
                        break;
                    }       
                }
                $http.post(baseURL + "subcategory",{subcategory:subcategory}).then(function(response){
                    console.log('success');
                });
            }
            console.log(addType);
		};

        $scope.workWindowPos = function($event){
            $scope.worksWindow.show = false;
            var cell = angular.element($event.target);
            $scope.top = (cell.prop('offsetParent').offsetTop
                    + cell.prop('offsetParent').offsetHeight) + 'px';
            $scope.left = cell.prop('offsetParent').offsetLeft + 'px';
        }

        $scope.searchWork = function (work, searchTxt) {
            $scope.worksWindow = {
                show: true,
                search: searchTxt,
                method: work.unit ? 'Edit' : 'Add',
                oldId: work ? work.code : '',
                oldName: work ? work.name : '',
                newWork: null
            };
        };  

		$scope.addWork = function (work) {
            var subcategoryWork = {subcategory_id:0, work_id: work.id, no:0, value:0};
            for(var i = $scope.rowPos-1; i>=0; i--)
            {
                subcategoryWork.subcategory_id = $scope.estimateSheet[i].subcategory_id;  
                // get subcategory id from row above( all rows have subcategory id)
                if($scope.estimateSheet[i].code && $scope.estimateSheet[i].code.charAt(0) == '*')
                {
                    subcategoryWork.no = 0;
                    break;// if the row above is subcategory, it means added work is the first work of subcategory( # = 0)
                }
                if($scope.estimateSheet[i].code && $scope.estimateSheet[i].code.charAt(0) != '*')
                {
                    subcategoryWork.no = $scope.estimateSheet[i].no + 1;
                    break; // find closest work to get #
                }       
            }
            //console.log(subcategoryWork);
            $http.post(baseURL + "subcategoryWork", {subcategoryWork:subcategoryWork}).then(function(response){
                $scope.estimateSheet.splice($scope.rowPos,1,work);
                $scope.worksWindow.show = false;
            });
        };

        /*Estimate Table Context Menu*/
        $scope.menuOptions = [
			['Add Row Above', function ($itemScope) {
                $scope.estimateSheet.splice($itemScope.$index, 0, {});
            }],
            null,
			['Add Row Below', function ($itemScope) {
                $scope.estimateSheet.splice($itemScope.$index+1, 0, {});
            }],
            null,
            ['Delete Row', function ($itemScope) {
                $scope.estimateSheet.splice($itemScope.$index, 1);
            }]
        ];
    }
);