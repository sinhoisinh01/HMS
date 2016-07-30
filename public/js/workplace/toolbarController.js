angular.module('HMS')
    .controller('ToolbarController', function (baseURL, $cookies, $http, $scope, $state, $stateParams) {
    	$http({
    		url: baseURL + 'suppliers',
    		method: 'GET',
    		params: {token: $cookies.get('googleToken')}
    	}).then(function(response){
    		$http({
    			url: baseURL + 'supplier/construction/' + $stateParams.construction_id,
	    		method: 'GET',
	    		params: {token: $cookies.get('googleToken')}
    		}).then(function(response){
    			$scope.supplier = response.data;
    		})
    		;
    		$scope.suppliers = response.data;
    	}, function () {
            $cookies.remove('googleToken');
            $state.go('login');
        });
    });
