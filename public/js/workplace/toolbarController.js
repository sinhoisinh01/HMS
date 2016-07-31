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
    			var $selected = {id:response.data.supplier_id,name:response.data.name};
                $scope.supplier = $selected;
    		})
    		;
    		$scope.suppliers = response.data;
    	}, function () {
            $cookies.remove('googleToken');
            $state.go('login');
        });
        $scope.changeSupplier = function()
        {
            var a = confirm("You are about to change prices of whole construction. Are you sure you want to continue?");
            if(a == 0)
                return 0;
            $http({
                url: baseURL + 'supplier/construction/' + $stateParams.construction_id + '/' + $scope.supplier.id,
                method: 'PUT',
                params: {token: $cookies.get('googleToken')}
            }).then(function(response){
                
            })
            ;
            
        }
    });
