angular.module('DuToan2', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('about', {
                url: '/',
                views: {
                    'header': {
                        templateUrl : 'views/aboutMenu.html'
                    },
                    'content': {
                        templateUrl : 'views/about.html'
                    }
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'header': {
                        templateUrl : 'views/homeMenu.html',
                        //controller  : 'HomeMenuController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'RecentContructions'
                    }
                }
            })
            .state('construction', {
                url: '/construction/:id',
                views: {
                    'header': {
                        templateUrl : 'views/estimateTableTop.html',
                        controller  : 'ConstructionTop'
                    },
                    'content': {
                        templateUrl : 'views/estimateTable.html',
                        controller  : 'EstimateTable'
                    }
                }
            })
    });