angular.module('HMS')
    .factory('userFactory', function ($q, $http, baseURL) {
		return {
			getUser: function() {
                var deferred = $q.defer();
                $http.get(baseURL + 'user').then(
                        function (response) {
                            cache = response.data;
                            deferred.resolve(cache);
                        },
                        function (reason) {
                            deferred.reject(reason);
                        }
                    );
                return deferred.promise;
			},
			deleteUser: function() {
				return $http.delete(baseURL + 'user');
			}
		};
    });