(function () {
    'use strict';
    //services
    angular.module('myApp')
    .factory("dataService", dataService)
    .factory("userService", userService)
    .factory("accountService", accountService)

    //Get Users information from Web API Service
    dataService.$inject = ['$http', 'serviceBasePath'];
    function dataService($http, serviceBasePath) {
        var fac = {};
        fac.GetAnonymousData = function () {
            return $http.get(serviceBasePath + '/api/data/forall').then(function (response) {
                return response.data;
            })
        }

        fac.GetAuthenticateData = function () {
            return $http.get(serviceBasePath + '/api/data/authenticate').then(function (response) {
                return response.data;
            })
        }

        fac.GetAuthorizeData = function () {
            return $http.get(serviceBasePath + '/api/data/authorize').then(function (response) {
                return response.data;
            })
        }
        return fac;
    };

    //Save current user in Session Storage (Browser)
    userService.$inject = [];
    function userService() {
        var fac = {};

        fac.CurrentUser = null;

        fac.SetCurrentUser = function (user) { 
            fac.CurrentUser = user;
            sessionStorage.user = angular.toJson(user);
        }

        fac.GetCurrentUser = function () {
            fac.CurrentUser = angular.fromJson(sessionStorage.user);
            return fac.CurrentUser;
        }

        return fac;
    };

    //Fetch token information from Web API Service
    accountService.$inject = ['$http', '$q', 'serviceBasePath', 'userService'];
    function accountService($http, $q, serviceBasePath, userService) {
        var fac = {};
        fac.login = function (user) {
            var obj = { 'username': user.username, 'password': user.password, 'grant_type': 'password' };
            Object.toparams = function ObjectsToParams(obj) {
                var p = [];
                for (var key in obj) {
                    p.push(key + '=' + encodeURIComponent(obj[key]));
                }
                return p.join('&');
            }

            var defer = $q.defer();
            $http({
                method: 'post',
                url: serviceBasePath + "/token",
                data: Object.toparams(obj),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                userService.SetCurrentUser(response.data);
                defer.resolve(response.data);
            }, function (error) {
                defer.reject(error.data);
            })
            return defer.promise;
        }
        fac.logout = function () {
            userService.CurrentUser = null;
            userService.SetCurrentUser(userService.CurrentUser);
        }
        return fac;
    }

})();