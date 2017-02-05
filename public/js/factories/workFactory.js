angular.module('HMS')
    .factory('workFactory', ['$rootScope', '$stateParams', '$http', '$q', 'baseURL' ,function ($rootScope, $stateParams, $http, $q, baseURL) {
        var cache;
        return {
            get: function () {
                var deferred = $q.defer();
                $http.get(baseURL + 'works', {params: {construction_id: $stateParams.construction_id}}).then(
					function (response) {
						cache = response.data;
						deferred.resolve(cache);
						$rootScope.hasInternetError = false;
					},
					function (reason) {		
						deferred.reject(reason);
						$rootScope.hasInternetError = true;
					}
				);
                return deferred.promise;
            },
            post: function () {
                
            },
			put: function () {
				
			},
			delete: function () {
				
			}
        };
    }]);