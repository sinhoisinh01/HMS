angular.module('HMS')
    .controller('LoginController', ['$state', '$scope','$rootScope',
        function ($state, $scope, $rootScope) {
            gapi.load('auth2', function () {
                auth2 = gapi.auth2.init({
                    client_id: '711327534359-06jkjslp3oqpmsrqmdivg3pk0go8pbud.apps.googleusercontent.com'
                });
				$scope.attachSignIn(document.getElementById('googleSignIn'));
            });
            $scope.onSignIn = function (googleUser) {
                $rootScope.token = googleUser.getAuthResponse().id_token;
                console.log($rootScope.token);
                $state.go('home')
            };
            $scope.signOut = function () {
                auth2.disconnect();
            };
            
			/* I think we could remove these codes below because it doesn't make error
			 * when I use my Google log In button
			 */
			/*gapi.signin2.render('signInButton',
                {
                    'onsuccess': $scope.onSignIn
                });*/
			
			$scope.attachSignIn = function (element) {
				console.log(element.id);
				auth2.attachClickHandler(element, {},
					function(googleUser) {
					  $scope.onSignIn(googleUser);
					}, function(error) {
					  alert(JSON.stringify(error, undefined, 2));
					});
			};
        }])
    .controller('NavController', function () {});