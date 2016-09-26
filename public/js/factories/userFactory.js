angular.module('HMS')
	.factory('userFactory', ['$http', 'baseURL', function($http, baseURL) {
		return {
			getUser: function() {
				return $http.get(baseURL + 'user');
			},
			deleteUser: function() {
				return $http.delete(baseURL + 'user');
			}
		};
	}])