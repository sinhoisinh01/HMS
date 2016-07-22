angular.module('HMS', ['ui.router','ui.bootstrap'])
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
                    'menu': {
                        templateUrl : 'views/table/menu.html',
                        controller  : 'MenuController'
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