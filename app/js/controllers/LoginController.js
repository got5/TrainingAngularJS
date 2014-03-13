(function () {
    "use strict";

    angular.module('app')
        .controller('LoginController', ['$scope', '$http', '$location', '$cookies', '$log', function ($scope, $http, $location, $cookies, $log) {
            $scope.errorMsg = null;

            $scope.logUser = function () {
                /** Gets all users... */
                $http.post('/api/login', {login: $scope.login, password: $scope.password})
                    .success(function (token) {
                        $http.defaults.headers.common.Authentication = token;
                        $cookies.token = token;
                        $location.path("/");
                    })
                    .error(function (reason) {
                        $log.error('unable to log  ' + reason);
                        $scope.errorMsg = "User not found.";
                    });
            };
        }]);
}());








