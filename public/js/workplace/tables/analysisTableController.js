angular.module('HMS')
.controller('analysisTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
	$scope.showAnalysisTable = false;
	$scope.resourceList = [];
	$scope.analysisSheet = [];
	$scope.currentRow = {};
	$scope.filterCondition = {"showMaterials" : true, "showLabors" : true, "showMachines" : true};
	$http.get(baseURL + 'analysisTable',{params:{construction_id: $stateParams.construction_id, category_id:$stateParams.category_id}})
	.then(function(response) {
		var data = response.data;
		var dataLength = data.length;
		for (var i=0; i<dataLength; i++)
		{
			var subCategory = {};
			subCategory.id = data[i].id;
			subCategory.code = "* Hạng mục:";
			subCategory.name = data[i].name;
			subCategory.classType = "bg-info";
			$scope.analysisSheet.push(subCategory);
			
			var subcategoryWorks = data[i].subcategory_works;
			var subcategoryWorksLength = subcategoryWorks.length;
			for (var j=0; j<subcategoryWorksLength; j++)
			{
				var work = {};
				work.id = subcategoryWorks[j].work.id;
				work.work_id = work.id;
				work.code = subcategoryWorks[j].work.code;
				work.work_code = work.code;
				work.name = subcategoryWorks[j].work.name;
				work.unit = subcategoryWorks[j].work.unit;
				work.value = subcategoryWorks[j].value;
				work.classType = "bg-warning";
				$scope.analysisSheet.push(work);
				
				var resourcesWork = data[i].subcategory_works[j].work.resource_work;
				var resourcesWorkLength = resourcesWork.length;
				for (var k=0; k<resourcesWorkLength; k++)
				{
					var resource = {};
					resource.id = resourcesWork[k].resource.id;
					resource.work_id = subcategoryWorks[j].work.id;
					resource.work_code = subcategoryWorks[j].work.code;
					resource.resourceCode = resourcesWork[k].resource.code;
					resource.name = resourcesWork[k].resource.name;
					resource.unit = resourcesWork[k].resource.unit;
					resource.unitValue = resourcesWork[k].value;
					resource.unitPrice = resourcesWork[k].resource.construction_resource[0].pivot.price;
					resource.workValue = subcategoryWorks[j].value;
					resource.classType = "table-success";
					$scope.analysisSheet.push(resource);
				}
			}
		}
		$scope.showAnalysisTable = true;
	},
	function(error) {
		$rootScope.hasInternetError = true;
	});

	// get Resource List
	$http.get(baseURL + 'resources', {params:{construction_id: $stateParams.construction_id}})
	.then(function(response) {
		$scope.resourceList = response.data;
	});

	$scope.resourcesWindow = {
        show: false,
        search: '',
        method: '',
        oldId: '',
        oldName: '',
        newResources: {}
    };

    $scope.searchResource = function (res, resTxt) {
        $scope.resourcesWindow = {
            show: true,
            search: resTxt,
            method: res.unit ? 'Cập nhật' : 'Thêm',
            oldId: res ? res.code : '',
            oldName: res ? res.name : '',
            newRes: null
        };
        $scope.currentRow = res;
    };

    $scope.resourcesWindowPos = function($event){
        $scope.resourcesWindow.show = false;
        var cell = angular.element($event.target);
        $scope.top = (cell.prop('offsetParent').offsetTop
                + cell.prop('offsetParent').offsetHeight) + 'px';
        $scope.left = cell.prop('offsetParent').offsetLeft + 'px';
    }

    $scope.addConstructionResourceWork = function() {
    	construction_resource_work.construction_id = $stateParams.construction_id;
    	construction_resource_work.resource_id = $scope.currentRow.id;
    	construction_resource_work.work_id = $scope.currentRow.work_id;
    	construction_resource_work.value = $scope.currentRow.unitValue;
    	$http.post(baseURL + "analysisTable", {construction_resource_work:construction_resource_work})
    		.then();

    	console.log(construction_resource_work);
    }
	
	$scope.filterResources = function(row) {
		// kiểm tra nếu dòng đang xét là dòng show resource
		if (row.resourceCode) {
			switch (row.resourceCode.substr(0,1)) {
				case 'V': 
					if ( $scope.filterCondition.showMaterials === true )
						return true;
					else return false;
					break;
				case 'N': 
					if ( $scope.filterCondition.showLabors === true )
						return true;
					else return false;
					break;
				case 'M': 
					if ( $scope.filterCondition.showMachines === true )
						return true;
					else return false;
					break;
				default : break;
			}		
		}
		return true;
	};
	
	/*Estimate Table Context Menu*/
    $scope.menuOptions = [
        ['Thêm vật tư', function ($itemScope) {
            if ( !$itemScope.row.work_code || $itemScope.row.work_code.substr(0,2) !== 'TT' ) {
				alert('Không thể chỉnh sửa định mức của nhà nước');
			}
			else {
				$scope.analysisSheet.push({
					"work_id": $itemScope.row.work_id,
					"workValue": $itemScope.row.value,
					"unitPrice": 0,
					"unitValue": 0,
					"classType": "table-success", 
					"isNewRow": true
				});
			}
        }],
        null,
        ['Xóa vật tư', function ($itemScope) {
			if ( !$itemScope.workCode || $itemScope.workCode.substr(0,2) !== 'TT' )
				$scope.alerts.addAlert();
        }]
    ];

    jQuery(document).ready(function(){
		setTimeout(function(){ 
			jQuery("#analysis-table").DataTable( {
			    fixedHeader: true
			} );
		}, 3000);
	});
});
