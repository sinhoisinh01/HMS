angular.module('HMS')
    .factory('constructionFactory', function ($http, $q, baseURL) {
        var cache;
        return {
            get: function () {
                var deferred = $q.defer();
                if (cache)
                    deferred.resolve(cache);
                else {
                    $http.get(baseURL + 'constructions').then(
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
            post: function (construction) {
                var deferred = $q.defer();
                $http.post(baseURL + 'construction', {construction: construction}).then(
                    function (response) {
                        cache.push(response.data);
                        deferred.resolve(response.data);
                    },
                    function (reason) {
                        deferred.reject(reason);
                    }
                );
                return deferred.promise;
            }
        };
    });