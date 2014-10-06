(function () {
    "use strict";

    angular.module('app')
        .controller('LoginController', ['$scope', '$location', 'UserService', function ($scope, $location, userService) {
            $scope.errorMsg = null;

            $scope.logUser = function() {
                userService.logUser($scope.login, $scope.password)
                    .then(function(currentUser) {
                        $location.path("/");
                    }, function(reason) {
                        $scope.errorMsg = reason;
                    });
            };
        }]);
})();