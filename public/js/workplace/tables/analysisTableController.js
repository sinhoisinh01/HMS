angular.module('HMS')
.controller('analysisTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
	$scope.analysisSheet = [];
	$scope.filterCondition = {"showMaterials" : true, "showLabors" : true, "showMachines" : true};
	$scope.alerts = {
		"alertList" : [], 
		"alertMessage" : "Không thể chỉnh sửa định mức của nhà nước", 
		"addAlert" : function() {
			$scope.alerts.alertList.push({msg: $scope.alerts.alertMessage});
		},
		"closeAlert" : function(index) {
			$scope.alerts.alertList.splice(index, 1);
		}
	};
	$http.get(baseURL + 'analysisTable',{params:{category_id:$stateParams.category_id}})
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
				work.code = subcategoryWorks[j].work.code;
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
	});
	
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
            if ( !$itemScope.workCode || $itemScope.workCode.substr(0,2) !== 'TT' )
				$scope.alerts.addAlert();

        }],
        null,
        ['Xóa vật tư', function ($itemScope) {
			if ( !$itemScope.workCode || $itemScope.workCode.substr(0,2) !== 'TT' )
				$scope.alerts.addAlert();
        }]
    ];
});
