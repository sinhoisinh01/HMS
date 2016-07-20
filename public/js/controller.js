angular.module('DuToan2')
    .constant("baseURL", "http://localhost/DuToan2/public/")
    .controller('LoginController', ['$http', 'baseURL', '$scope', function ($http, baseURL, $scope) {
        gapi.load('auth2', function () {
            auth2 = gapi.auth2.init({
                client_id: '711327534359-06jkjslp3oqpmsrqmdivg3pk0go8pbud.apps.googleusercontent.com'
            });
        });
        $scope.name = '';
        $scope.onSignIn = function () {
            // keep somes informations on front-end

            // just for example
            $http({
                url: baseURL + 'testAuth',
                method: "GET",
                params: {token: auth2.currentUser.get().hg.id_token}
            }).then(function (response) {
                $scope.name = response.data;
            });
        };
        $scope.signOut = function () {
            auth2.disconnect();
        };

        gapi.signin2.render('signInButton',
            {
                'onsuccess': $scope.onSignIn
            });
    }])
    .controller('RecentContructions', ['$http', 'baseURL','$scope', function ($http, baseURL,$scope) {
        $scope.recentConstructions = {};
         $scope.getDateFormat = function(timestamp) {
            return new Date(timestamp);
        };
        $http.get(baseURL + 'home').then(function (response) {
            $scope.recentConstructions = response.data;
        });
    }])
    .controller('AllConstructions',['$http','baseURL','$scope',function($http, baseURL, $scope){
        $scope.allConstructions = {};
        $scope.getDateFormat = function(timestamp) {
            return new Date(timestamp);
        };
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
    }]);