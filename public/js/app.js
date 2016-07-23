angular.module('HMS', ['ui.router','ui.bootstrap','ngCookies'])
    .constant("baseURL", "http://localhost/HMS/public/")
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('about', {
                url: '/',
                views: {
                    'content': {
                        templateUrl : 'views/about.html'
                    }
                }
            })
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
                url: '/home',
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
                        templateUrl : 'views/table/tableNav.html',
                        controller  : 'TableNavController'
                    },
                    'toolbar': {
                        templateUrl : 'views/table/toolbar.html',
                        controller  : 'ToolbarController'
                    },
                    'categories': {
                        templateUrl : 'views/table/categories.html',
                        controller  : 'CategoriesController'
                    }
                }
            })
            .state('construction.category', {
                url: '/category/:category_id',
                views: {
                    'content@': {
                        templateUrl : 'views/table/table.html',
                        controller  : 'TableController'
                    }
                }
            })
    });