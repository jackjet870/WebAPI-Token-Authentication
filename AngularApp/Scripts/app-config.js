(function () {
    'use strict';

    angular.module('myApp')
    .config(routConfig)
    .config(interceptor);

    routConfig.$inject = ['$routeProvider'];
    function routConfig ($routeProvider) {
        $routeProvider
   .when('/', {
       redirectTo: '/home'
   })
   .when('/home', {
       templateUrl: '/template/home.html',
       controller: 'HomeController'
   })
   .when('/authenticated', {
       templateUrl: '/template/authenticate.html',
       controller: 'AuthenticateController'
   })
   .when('/authorized', {
       templateUrl: '/template/authorize.html',
       controller: 'AuthorizeController'
   })
   .when('/login', {
       templateUrl: '/template/login.html',
       controller: 'LoginController'
   })
   .when('/unauthorized', {
       templateUrl: '/template/unauthorize.html',
       controller: 'UnauthorizeController'
   })
    };

    interceptor.$inject = ['$httpProvider'];
    function interceptor($httpProvider) {
        var interceptor = function (userService, $q, $location) {
            return {
                request: function (config) {
                    var currentUser = userService.GetCurrentUser();
                    if (currentUser != null) {
                        config.headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                    }
                    return config;
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        $location.path('/login');
                        return $q.reject(rejection);
                    }
                    if (rejection.status === 403) {
                        $location.path('/unauthorized');
                        return $q.reject(rejection);
                    }
                    return $q.reject(rejection);
                }

            }
        }
        var params = ['userService', '$q', '$location'];
        interceptor.$inject = params;
        $httpProvider.interceptors.push(interceptor);
    }


})();