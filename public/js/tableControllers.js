angular.module('HMS')
    .controller('TableTopController', ['$stateParams', '$http', 'baseURL', '$scope',
        function ($stateParams, $http, baseURL, $scope) {

        }])
    .controller('TableController', ['$stateParams', '$http', 'baseURL', '$scope',
        function ($stateParams, $http, baseURL, $scope) {

        }])
    .controller('CategoriesController', ['$stateParams', '$http', 'baseURL', '$scope', '$uibModal',
        function ($stateParams, $http, baseURL, $scope, $uibModal) {
            $scope.categories = [];
            $http({
                url: baseURL + 'construction/' + $stateParams.construction_id,
                method: 'GET',
                params: {token: auth2.currentUser.get().hg.id_token}
            }).then(function (response) {
                $scope.categories = response.data;
            });
            $scope.add = function () {
                $uibModal.open({
                    templateUrl: 'views/modals/addCategory.html',
                    controller: 'AddCategoryController'
                }).result.then(function (category) {
                    $scope.categories.push(category);
                });
            };
        }])
    .controller('AddCategoryController', function ($stateParams, $http, baseURL, $scope, $uibModalInstance) {
        $scope.create = function () {
            $http({
                url: baseURL + 'construction/' + $stateParams.construction_id + '/' + $scope.name,
                method: "GET",
                params: {token: auth2.currentUser.get().hg.id_token}
            }).then(function (response) {
                $uibModalInstance.close(response.data);
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });