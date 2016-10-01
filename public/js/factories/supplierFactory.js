angular.module('HMS')
    .factory('supplierFactory', ['$rootScope', '$http', '$q', 'baseURL' ,function ($rootScope, $http, $q, baseURL) {
        var cache;
        return {
            get: function (id) {
                var deferred = $q.defer();
                if (cache) {
					if (id) {
						deferred.resolve(cache.filter(function (supplier) {
							return supplier.id == id;
						}));
					}
					else deferred.resolve(cache);
					$rootScope.hasInternetError = false;
				}
				else {
					// return suppliers array. If there is an id, the array length will be 1
					$http.get(baseURL + 'suppliers').then(
						function (response) {
							cache = response.data;
							if (id) {
								deferred.resolve(cache.filter(function (supplier) {
										return supplier.id == id;
								}));
							}
							else deferred.resolve(cache);
							$rootScope.hasInternetError = false;
						},
						function (reason) {		
							deferred.reject(reason);
							$rootScope.hasInternetError = true;
						}
					);
				}
                return deferred.promise;
            },
            post: function (supplier) {
                var deferred = $q.defer();
                $http.post(baseURL + 'supplier', {supplier: supplier}).then(
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
			put: function (id, supplier) {
				var deferred = $q.defer();
				$http.post(baseURL + 'supplier/' + id, {supplier:supplier}).then(
					function () {
						cache.forEach(function (sup, i) {
                        if (sup.id == supplier.id)
                            cache[i] = supplier;
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
			delete: function (id) {
				var deferred = $q.defer();
				$http.delete(baseURL + 'supplier/' + id).then(
					function () {
						cache = cache.filter(function (supplier) {
                            return supplier.id !== id;
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
			}
        };
    }]);