angular.module('HMS')
.controller('analysisTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
	$scope.analysisSheet = [];
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
});
