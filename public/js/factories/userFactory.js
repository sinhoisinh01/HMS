angular.module('HMS')
    .factory('userFactory', function ($q, $http, baseURL) {
        var cache;
		return {
			getUser: function() {
                var deferred = $q.defer();
                if (cache)
                    deferred.resolve(cache);
                else {
                    $http.get(baseURL + 'user').then(
                        function (response) {
                            cache = response.data;
                            deferred.resolve(cache);
                        },
                        function (reason) {
                            deferred.reject(reason);
                        }
                    );
                }
                return deferred.promise;
			},
			deleteUser: function() {
				return $http.delete(baseURL + 'user');
			}
		};
    });