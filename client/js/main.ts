angular.module('myBlogApp', ['ngRoute', 'ngResource', 'myBlogApp.controllers', 'myBlogApp.factories', 'myBlogApp.services', 'myBlogApp.directives'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider: any, $locationProvider: any) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/blogposts.html',
                controller: 'BlogpostsController'
            })
            .when('/compose', {
                templateUrl: 'views/newpost.html',
                controller: 'ComposeController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/users', {
                templateUrl: 'views/userlist.html',
                controller: 'UserListController',
                requiresLogin: true
            })
            .when('/users/:id', {
                templateUrl: 'views/account.html',
                controller: 'AccountController',
                requiresLogin: true
            })
            .when('/:id', {
                templateUrl: 'views/singleview.html',
                controller: 'SingleController'
            })
            .when('/:id/update', {
                templateUrl: 'views/updateview.html',
                controller: 'UpdateController'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }])
    .run(['$rootScope', '$location', 'UserService', function($rootScope: any, $location: any, UserService: any) {
        $rootScope.$on('$routeChangeStart', function(event: any, nextRoute: any, previouseRoute: any) {
            if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {
                event.preventDefault();
                UserService.loginRedirect();
            }
        });
    }]);