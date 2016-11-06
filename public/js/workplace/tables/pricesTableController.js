angular.module('HMS')
.controller('pricesTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope, workFactory) {
	$scope.showPricesTable = false;
	$scope.filterCondition = {"showMaterials" : true, "showLabors" : true, "showMachines" : true};
	$http.get(baseURL + 'pricesTable', {params: {construction_id: $stateParams.construction_id, category_id:$stateParams.category_id}})
	.then(function(response) {
		$scope.pricesTable = response.data;
		$scope.showPricesTable = true;
	},
	function(error) {
		$scope.hasInternetError = true;
	});
	
	$scope.filterResources = function(row) {
		// kiểm tra nếu dòng đang xét là dòng show resource
		switch (row.code.substr(0,1)) {
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
			default : 
				return true;
				break;
		}		
	};

	$scope.storeOldPrice = function(oldPrice) {
		$scope.oldPrice = oldPrice;
	}

	$scope.updatePrice = function(row) {
		if (row.price != $scope.oldPrice) {
			$http.post(baseURL + 'pricesTable', {construction_id: $stateParams.construction_id, resource_id: row.resource_id, price: row.price});
			workFactory.emptyCache();
		}
	}
});