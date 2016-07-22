angular.module('HMS', ['ui.router','ui.bootstrap'])
    .constant("baseURL", "http://localhost/HMS/public/")
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('about', {
                url: '/',
                views: {
                    'header': {
                        templateUrl : ''
                    },
                    'content': {
                        templateUrl : 'views/about.html'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    'header': {
                        templateUrl : ''
                    },
                    'content': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'
                    }
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'header': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
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
                    'header': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    },
                    'content': {
                        templateUrl : 'views/table.html',
                        controller  : 'TableController'
                    }
                }
            })
            .state('construction.category', {
                url: '/construction/:construction_id/category/:category_id',
                views: {
                    'content': {
                        templateUrl : 'views/table.html',
                        controller  : 'TableController'
                    }
                }
            })
    });