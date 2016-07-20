angular.module('DuToan2')
    .constant("baseURL", "http://localhost/DuToan2/public/")
    .controller('RecentContructions', ['$http', 'baseURL','$scope', function ($http, baseURL,$scope) {
        $scope.recentConstructions = {};
         $scope.getDateFormat = function(timestamp) {
            return new Date(timestamp);
        }
        $http.get(baseURL + 'home').then(function (response) {
            $scope.recentConstructions = response.data;
        });
    }])
    .controller('AllConstructions',['$http','baseURL','$scope',function($http, baseURL, $scope){
        $scope.allConstructions = {};
        $scope.getDateFormat = function(timestamp) {
            return new Date(timestamp);
        }
        $http.get(baseURL + 'home/all-constructions').then(function (response) {
            $scope.allConstructions = response.data;
        });
    }])
    .controller('ConstructionTop', ['$stateParams','$http', 'baseURL','$scope', function ($stateParams, $http, baseURL,$scope) {
       
    }])
    .controller('EstimateTable', ['$stateParams','$http', 'baseURL','$scope', function ($stateParams, $http, baseURL,$scope) {
        fitness();
        resize_estimate_table();
        resize_new_work();
        $scope.category_work = {};
        $http.get(baseURL + "category_work/")

    }])
    .controller('Categories', ['$stateParams','$http', 'baseURL','$scope', function ($stateParams, $http, baseURL,$scope) {
        $scope.categories = {};
        $http.get(baseURL + 'construction/' + $stateParams.id).then(function (response) {
            $scope.categories = response.data;
        });
    }])
   
    ;
