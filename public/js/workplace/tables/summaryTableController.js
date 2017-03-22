angular.module('HMS')
    .controller('summaryTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope) {
    	$scope.summaryTable = {
    		"VL": 0,
    		"NC": 0,
    		"M": 0,
    		"TT": 0,
    		"T": 0,
    		"C": 0,
    		"G": 0,
    		"VAT": 0,
    		"Gxd": 0,
    		"Gxdnt": 0,
    		"Gxdtc": 0
    	};
    	$http.get(baseURL + 'summaryTable',{params:{construction_id: $stateParams.construction_id, category_id:$stateParams.category_id}})
		.then(function(response) {
			$scope.summaryTable.VL = response.data.materialPrice;
			$scope.summaryTable.NC = response.data.labourPrice * 5.333;
			$scope.summaryTable.M = response.data.machinePrice * 1.500;
			$scope.summaryTable.TT = ($scope.summaryTable.VL + $scope.summaryTable.NC + $scope.summaryTable.M) * 0.025;
			$scope.summaryTable.T = $scope.summaryTable.VL + $scope.summaryTable.NC + $scope.summaryTable.M + $scope.summaryTable.TT;
			$scope.summaryTable.C = $scope.summaryTable.T * 0.065;
			$scope.summaryTable.L = ($scope.summaryTable.T + $scope.summaryTable.C) * 0.055;
			$scope.summaryTable.G = $scope.summaryTable.T + $scope.summaryTable.C + $scope.summaryTable.L;
			$scope.summaryTable.VAT = $scope.summaryTable.G * 0.1;
			$scope.summaryTable.Gxd = $scope.summaryTable.G + $scope.summaryTable.VAT;
			$scope.summaryTable.Gxdnt = $scope.summaryTable.G * 1/100 + (1 + 10/100);
			$scope.summaryTable.Gxdtc = $scope.summaryTable.Gxd + $scope.summaryTable.Gxdnt;
		});
    });