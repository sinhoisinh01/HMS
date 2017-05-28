angular.module('HMS')
    .controller('CategoriesController', function ($stateParams, $state, $http, baseURL, $scope, $uibModal, $rootScope, $location, mySweetAlert) {
        $rootScope.isCollapsedCategories = false;
        $http.get(baseURL + 'categories', {params: {construction_id: $stateParams.construction_id}})
            .then(function (response) {
                $scope.categories = response.data;
            });
        $scope.add = function () {
            $scope.action = "Tạo mới";
            $scope.names = $scope.categories.map(function (cat) {
                return cat.name;
            });
            $uibModal.open({
                templateUrl: 'views/modals/categoryModal.html',
                scope: $scope
            }).result.then(function (name) {
                var category = {construction_id:$stateParams.construction_id,name:name};
                $http.post(baseURL + 'category', {category:category})
                    .then(function (response) {
                        $scope.name = "";
                        $scope.categories.push(response.data);
                        var subcategory = {category_id:response.data.id, name:'', no:0};
                        $http.post(baseURL + 'subcategory', {subcategory:subcategory}).then({});
                    });
            });
        };
        $scope.edit = function (index) {
            $scope.action = "Cập nhật";
            $scope.name = $scope.categories[index].name;
            $scope.names = $scope.categories.map(function (cat) {
                return cat.name;
            });
            $uibModal.open({
                templateUrl: 'views/modals/categoryModal.html',
                scope: $scope
            }).result.then(function (name) {
                var category = {construction_id:$stateParams.construction_id,name:name};
                $http.post(baseURL + 'category/' + $scope.categories[index].id,
                    {category: category}).then(function () {
                    $scope.categories[index].name = name;
                });
            });
        };
        $scope.remove = function (index) {
            swal(
                mySweetAlert.getType("warning","Tất cả hạng mục con, công tác và diễn giải của hạng mục này sẽ bị xóa theo")
                ,
                function(){
                    $http.delete(baseURL + 'category/' + $scope.categories[index].id).then(function () {
                    if ($location.path().indexOf('category/' + $scope.categories[index].id) != -1)
                        $location.path('construction/' + $stateParams.construction_id);
                    $scope.categories.splice(index, 1);
                });
                    swal({
                        title:"Đã xóa",
                        type: "success"
                    });
                }
            );
            
                
        };
    });
	