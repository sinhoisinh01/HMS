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
                    'tableNav': {
                        templateUrl : 'views/workplace/tableNav.html',
                        controller  : 'TableNavController'
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
                url: '/category/:category_id/:workplace',
                views: {
                    '': { templateUrl: 'views/workplace/content.html' },
					'header@construction.category' : {
						templateUrl : 'views/workplace/tabs.html'
                    },
					'table@construction.category': {
                        templateUrl : 'views/workplace/tables/estimateTable.html',
                        controller  : 'TableController'
                    }
                }
            })
    });