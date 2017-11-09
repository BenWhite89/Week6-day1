angular.module('myBlogApp.controllers', ['ngRoute', 'ngResource', 'myBlogApp.factories'])

    .controller('NavbarController', ['$scope', '$location', 'Categories', 'Users', 'UserService', function($scope, $location, Categories, Users, UserService) {
        Users.query(function(data: any) {
            $scope.users = data;
        });

        UserService.me().then((success: any) => {
            $scope.currentUser = success.id;
            $scope.currentName = `${success.firstname} ${success.lastname}`;
        });

        Categories.query(function(data: any) {
            $scope.categories = data;
        });

        $scope.saveUser = function () {
            let newUser = new Users({
                firstName: $scope.newFirst,
                lastName: $scope.newLast,
                email: $scope.newEmail,
                password: $scope.newPass
            });
            console.log(newUser);
            newUser.$save(function() {
                $location.url('/');
            });

        };

        $scope.saveCategory = function() {
            let newCategory = new Categories({
                categoryName: $scope.newCategory
            });
            newCategory.$save()
               .then($location.url('/'));
        };
    }])

    .controller('BlogpostsController', ['$scope', '$location', 'Posts', 'Users', 'Categories', function($scope, $location, Posts, Users, Categories) {
        Posts.query(function(data: any) {
            $scope.posts = data;
        });

        $scope.saveUser = function () {
            let newUser = new Users({
                firstName: $scope.newFirst,
                lastName: $scope.newLast,
                email: $scope.newEmail,
                password: $scope.newPass
            });
            newUser.$save(function() {
                $location.url('/');
            });

        };
        $scope.saveCategory = function() {
            let newCategory = new Categories({
                categoryName: $scope.newCategory
            });
            newCategory.$save()
               .then($location.url('/'));
        };

    }])

    .controller('ComposeController', ['$scope', '$location', 'Posts', 'Users', 'Categories', function ($scope, $location, Posts, Users, Categories) {
        $scope.categories = Categories.query(function(data: any) {
            $scope.category = data;
        });
        $scope.users = Users.query(function(data: any) {
            $scope.user = data;
        });
        $scope.title = '';
        $scope.content = '';

        $scope.createPost = function() {
            let newPost = new Posts({
                userId: $scope.user.id,
                categoryId: $scope.category.id,
                title: $scope.title,
                content: $scope.content
            });
            newPost.$save(function(success: any) {
                $location.url('/');
            })
        };
    }])

    .controller('SingleController', ['$scope', '$location', '$routeParams', 'Posts', 'Users', 'Categories', function($scope, $location, $routeParams, Posts, Users, Categories) {

        $scope.post = Posts.get({id: $routeParams.id});

        $scope.updateView = function(id: any) {
            $location.url(`/${id}/update`);
        }

        $scope.delete = function() {
            $scope.post.$delete();
            $location.replace().path('/');
        };


        $scope.cancel = function () {
            $location.url('/');
        }

    }])

    .controller('UpdateController', ['$scope', '$location', '$routeParams', 'Posts', 'Users', 'Categories', function($scope, $location, $routeParams, Posts, Users, Categories) {

        Posts.get({ id: $routeParams.id }, function(data: any) {
            $scope.post = data;
            $scope.title = data.title;
            $scope.content = data.content;
            $scope.default = $scope.categories.findIndex((obj: any) => obj.id === data.categoryId);
            $scope.category = $scope.categories[$scope.default];
        });

        $scope.categories = Categories.query();

        $scope.updatePost = function() {
            let e = new Posts({
                categoryId: $scope.category.id,
                title: $scope.title,
                content: $scope.content
            });

            e.$update({id: $routeParams.id});
            $location.url(`/${$routeParams.id}`);
        }
    }])

    .controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
        $scope.email = '';
        $scope.password = '';
        
        UserService.me().then((success: any) => {
            redirect();
        })

        function redirect() {
            let dest = $location.search().dest;
            if (!dest) {
                dest = '/';
            }
            $location.replace().path(dest).search('dest', null);
        }

        $scope.login = function() {
            UserService.login($scope.email, $scope.password)
                .then(() => {
                    redirect();
                }, (err: any) => {
                    console.log(err);
                });
        }

        $scope.logout = function() {
            UserService.logout();
        }
    }])

    .controller('UserListController', ['$scope', '$location', '$routeParams', 'Users', function($scope, $location, $routeParams, Users) {
        $scope.users = Users.query();

    }])

    .controller('AccountController', ['$scope', '$location', '$routeParams',  'Users', 'UserService', function($scope, $location, $routeParams, Users, UserService) {
        UserService.me().then((success: any) => {
            $scope.currentUser = success;
        });

        $scope.updateUser = function() {
            let user = new Users({
                firstName: $scope.currentUser.firstname,
                lastName: $scope.currentUser.lastname,
                email: $scope.currentUser.email
            });

            user.$update({id: $routeParams.id});
            $location.url('/');
        }

        $scope.logout = function() {
            UserService.logout();
            $location.url('/');
        }

        $scope.deleteUser = function() {
            Users.delete({ id: $routeParams.id});
        }

    }])