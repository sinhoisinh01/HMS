angular.module('HMS', ['ui.router','ui.bootstrap','ngCookies'])
    .constant("baseURL", "http://localhost/HMS/public/")
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('login', {
                url: '/login',
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
                }
            })
            .state('construction.category', {
                url: '/category/:category_id',
                views: {
                    'tabs@' : {
                        templateUrl : 'views/workplace/tabs.html',
                        controller : 'TabsController'
                    }
                }
            })
			.state('construction.category.table', {
                url: '/:table',
                views: {
					'table@': {
                        templateUrl : function ($stateParams){
                            return 'views/workplace/tables/' + $stateParams.table + 'Table.html';
                        },
                        controller  :  function ($stateParams){
                            return $stateParams.table + 'TableController';
                        }
                    }
                }
            })
    });