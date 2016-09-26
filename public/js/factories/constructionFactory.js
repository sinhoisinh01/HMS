angular.module('HMS')
	.service('constructionHttpService', function($http, $q, baseURL) {
		var cache;

		function getConstructions() {
			var deferred = $q.defer();
			if (cache) {
				deferred.resolve(cache);
			}
			else {
				$http.get(baseURL + 'constructions').then(
					function success(response) {
						cache = response.data;
						deferred.resolve(cache);
					},
					function failure(reason) {
						deferred.reject(reason);
					}
				);
			}
			return deferred.promise;
		}

		function clearCache() {
			cache = null;
		}

		return {
			getConstructions: getConstructions,
			clearCache: clearCache
		};
	})
	.service('constructionFormatter', function() {
		return function townFormatter(jsonData) {
			console.log(jsonData);
			return jsonData;
		};
	})
	.factory('constructionFactory', function(constructionHttpService, constructionFormatter) {
		return {
			getConstructions: function() {
				return constructionHttpService.getConstructions();
			}
			// If we do like codes below it will return a strange object and we can't get it in homeController.js
			/*getConstructions: function() {
				return constructionHttpService.getConstructions(constructionFormatter);
			}*/
		};
	})