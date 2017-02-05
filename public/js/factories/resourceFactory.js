angular.module('HMS')
    .factory('resourceFactory', ['$rootScope', '$http', '$q', 'baseURL', '$stateParams', function ($rootScope, $http, $stateParams, $q, baseURL) {
        return {
            get: function () {
                var deferred = $q.defer();
                $http.get(baseURL + 'resources').then(
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
				// return an array with one resource which have the same id
				var deferred = $q.defer();
				$http.get(baseURL + 'resources').then(
					function (response) {
						cache = response.data;
						deferred.resolve(cache.filter(function (resource) {
							return resource.id == id;
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
            post: function (resource) {
                var deferred = $q.defer();
                $http.post(baseURL + 'resource', {resource: resource}).then(
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
			put: function (id, resource) {
				var deferred = $q.defer();
				$http.post(baseURL + 'resource/' + id, {resource:resource}).then(
					function () {
						cache.forEach(function (res, i) {
                        if (res.id == resource.id)
                            cache[i] = resource;
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
				$http.delete(baseURL + 'resource/' + id).then(
					function () {
						cache = cache.filter(function (resource) {
                            return resource.id !== id;
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