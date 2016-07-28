angular.module('HMS')
    .controller('estimateTableController', function ($scope) {
		$scope.testEstimateTable = [
			{
				work_id : "AA.111000",
				name : "Xây nhà đá cạnh ao cá",
				amount : "5",
				length : "3",
				width : "4",
				height : "20",
				value : "",
				unit : "cái",
				price : "500000",
				total : ""
			},
			{
				work_id : "AB.11310",
				name : "Something",
				amount : "5",
				length : "3",
				width : "4",
				height : "20",
				value : "",
				unit : "cái",
				price : "500000",
				total : ""
			},
			{
				work_id : "AA.111000",
				name : "Another things",
				amount : "5",
				length : "3",
				width : "4",
				height : "20",
				value : "",
				unit : "cái",
				price : "500000",
				total : ""
			},
			{
				work_id : "AB.11310",
				name : "More things",
				amount : "5",
				length : "3",
				width : "4",
				height : "20",
				value : "",
				unit : "cái",
				price : "500000",
				total : ""
			},
			{
				work_id : "AB.11310",
				name : "More things",
				amount : "5",
				length : "3",
				width : "4",
				height : "20",
				value : "",
				unit : "cái",
				price : "500000",
				total : ""
			},
			{
				work_id : "AB.11310",
				name : "More things",
				amount : "5",
				length : "3",
				width : "4",
				height : "20",
				value : "",
				unit : "cái",
				price : "500000",
				total : ""
			},
			{
				work_id : "AB.11310",
				name : "More things",
				amount : "5",
				length : "3",
				width : "4",
				height : "20",
				value : "",
				unit : "cái",
				price : "500000",
				total : ""
			}
		];
		$scope.getPointedValue = function(ele)
		{
			console.log(ele);
			console.log(angular.element(ele));
			$scope.pointerValue = angular.element(ele).html;
		};
		/*
        $http({
            url: baseURL + 'works',
            method : "GET",
            params : {token: $cookies.get('googleToken')}
        }).then(function(response) {
            $scope.works = response.data;
        });*/
    });