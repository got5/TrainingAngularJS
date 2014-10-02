(function () {
    "use strict";

    angular.module('app')
        .controller('LoginController', ['$scope' , '$http', '$log', '$cookieStore', '$location', function ($scope, $http, $log, $cookieStore, $location) {
            $scope.errorMsg = null;

            $scope.logUser = function () {
                $http.post('/api/login', {login: $scope.login, password: $scope.password})
                    .success(function (user) {
                        $log.info('Authentication successed !');
                        /**
                         * Use cookies to store user
                         */
                        $cookieStore.put('user', user);
                        /**
                         * Redirection
                         */
                        $location.path('/');

                    })
                    .error(function (reason) {
                            $log.error('unable to log  ' + reason);
                            $scope.errorMsg = "Bad Login and/or password";
                    });

            };
        }]);
})();








