angular.module('myBlogApp.directives', ['ngRoute', 'myBlogApp.controllers'])

    .directive('customNav', [ function() {
        return {
            restrict: 'E',
            scope: {

            },
            templateUrl: '../views/navbar.html',
            controller: 'NavbarController'
        }
    }])

    .directive('blogPost', [ function() {
        return {
            templateUrl: '../views/postTemplate.html'
        }
    }]);