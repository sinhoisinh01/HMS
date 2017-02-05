angular.module('HMS')
    .factory('constructionFactory', ['$rootScope', '$http', '$q', 'baseURL' ,function ($rootScope, $http, $q, baseURL) {
        var cache;
        var hasSearchResult = false;
        return {
            get: function () {
                var deferred = $q.defer();
                if (cache) {
					deferred.resolve(cache);
					$rootScope.hasInternetError = false;
				}
				else $http.get(baseURL + 'constructions').then(
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
			getById: function (id) {
				// return an array with one construction which have the same id
				var deferred = $q.defer();
				if (cache)
					deferred.resolve(cache.filter(function (construction) {
						return construction.id == id;
					}));
				else $http.get(baseURL + 'constructions').then(
					function (response) {
						cache = response.data;
						deferred.resolve(cache.filter(function (construction) {
							return construction.id == id;
						}));
						$rootScope.hasInternetError = false;
					},
					function (reason) {		
						deferred.reject(reason);
						$rootScope.hasInternetError = true;
					}
				);
				return deferred.promise;
			},
            post: function (construction) {
                var deferred = $q.defer();
                $http.post(baseURL + 'construction', {construction: construction}).then(
                    function (response) {
                        cache.push(response.data);
                        deferred.resolve(response.data);
						$rootScope.hasInternetError = false;
                    },
                    function (reason) {
                        deferred.reject(reason);
						$rootScope.hasInternetError = true;
                    }
                );
                return deferred.promise;
            },
			put: function (construction) {
				var deferred = $q.defer();
				$http.post(baseURL + 'construction/' + construction.id, {construction:construction}).then(
					function () {
						cache.forEach(function (con, i) {
							if (con.id == construction.id)
								cache[i] = construction;
						});
						$rootScope.hasInternetError = false;
						deferred.resolve();
					},
					function () {
						deferred.reject();
						$rootScope.hasInternetError = true;
					}
				);
				return deferred.promise;
			},
			delete: function (id) {
				var deferred = $q.defer();
				$http.delete(baseURL + 'construction/' + id).then(
					function () {
						cache = cache.filter(function (con) {
                            return con.id !== id;
                        });
						deferred.resolve();
						$rootScope.hasInternetError = false;
					},
					function () {
						deferred.reject();
						$rootScope.hasInternetError = true;
					}
				);
				return deferred.promise;
			},
        };
    }]);