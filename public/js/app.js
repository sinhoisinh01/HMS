angular.module('HMS', ['ui.router','ui.bootstrap','ngCookies'])
    .constant("baseURL", "http://localhost/HMS/public/")
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('login', {
                url: '/login/:token',
                views: {
                    'content': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'
                    }
                }
            })
            .state('home', {
                url: '/',
                views: {
                    'nav': {
                        templateUrl : 'views/nav.html',
                        controller  : 'NavController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    }
                }
            })
            .state('construction', {
                url: '/construction/:construction_id',
                views: {
                    'nav': {
                        templateUrl : 'views/nav.html',
                        controller  : 'NavController'
                    },
                    'menu': {
                        templateUrl : 'views/workplace/menu.html',
                        controller  : 'MenuController'
                    },
                    'toolbar': {
                        templateUrl : 'views/workplace/toolbar.html',
                        controller  : 'ToolbarController'
                    },
                    'categories': {
                        templateUrl : 'views/workplace/categories.html',
                        controller  : 'CategoriesController'
                    }
                },
                params: {
                    name: null
                }
            })
            .state('construction.category', {
                url: '/category/:category_id',
                views: {
                    'tabs@' : {
                        templateUrl : 'views/workplace/tabs.html',
                        controller : 'TabsController'
                    }
                },

            })
			.state('construction.category.table', {
                url: '/',
                views: {
					'table@': {
                        templateUrl : function ($stateParams){
                            return 'views/workplace/tables/' + $stateParams.table + 'Table.html';
                        },
                        controllerProvider  :  function ($stateParams){
                            return $stateParams.table + 'TableController';
                        }
                    }
                },
                params: {
                    table: 'estimate'
                }
            })
    })
    .directive('contenteditable', function() {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                function read() {
                    var html = element.html();
                    if (attrs.stripBr && html == '<br>')
                        html = '';
                    ngModel.$setViewValue(html);
                }
                ngModel.$render = function() {
                    element.html(ngModel.$viewValue || '');
                };
                element.bind("blur keyup change", function() {
                    scope.$apply(read);
                });
                element.bind("keyup", function($index){
                    var worksTable = angular.element(document.querySelector('#works_table'));
                    //console.log(scope.$index);
                    var top = element.prop('offsetTop');
                    var left = element.prop('offsetLeft')
                    worksTable.css({left: left+'px' , top: top+18+'px'});
                    // set the position of works table
                });
            }
        };
    });
  