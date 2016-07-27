angular.module('HMS')
    .controller('MenuController', function ($rootScope, $stateParams, $scope) {
        $rootScope.constructionName = $stateParams.name;
        $scope.collapseCategories = function() {
            $rootScope.isCollapsedCategories = !$rootScope.isCollapsedCategories;
        };
    });
