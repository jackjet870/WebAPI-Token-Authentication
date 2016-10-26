(function () {
    'use strict';

    angular.module('myApp')
    .controller("HomeController", HomeController)
    .controller("AuthenticateController", AuthenticateController)
    .controller("AuthorizeController", AuthorizeController)
    .controller("LoginController", LoginController)
    .controller("UnauthorizeController", UnauthorizeController);

    HomeController.$inject = ['$scope', 'dataService'];
    function HomeController($scope, dataService) {
        //FETCH DATA FROM SERVICES
        $scope.data = "";
        dataService.GetAnonymousData().then(function (data) {
            $scope.data = data;
        })
    };

    AuthenticateController.$inject = ['$scope', 'dataService'];
    function AuthenticateController($scope, dataService) {
        //FETCH DATA FROM SERVICES
        $scope.data = "";
        dataService.GetAuthenticateData().then(function (data) {
            $scope.data = data;
        })
    }

    AuthorizeController.$inject = ['$scope', 'dataService'];
    function AuthorizeController($scope,dataService) {
        //FETCH DATA FROM SERVICES
        $scope.data = "";
        dataService.GetAuthorizeData().then(function (data) {
            $scope.data = data;
        })
    }
    LoginController.$inject = ['$scope', 'accountService', '$location'];
    function LoginController($scope, accountService, $location) {
        //FETCH DATA FROM SERVICES
        $scope.account = {
            username: '',
            password: ''
        }
        $scope.message = "";
        $scope.login = function () {
            accountService.login($scope.account).then(function (data) {
                $location.path('/home');
            }, function (error) {
                $scope.message = error.error_description;
            })
        }
    };

    UnauthorizeController.$inject = ['$scope'];
    function UnauthorizeController($scope) {
        //FETCH DATA FROM SERVICES
        $scope.data = "Sorry you are not authorize to access this page";
    };


})();