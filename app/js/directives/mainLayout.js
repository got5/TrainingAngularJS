(function () {
    "use strict";

    var app = angular.module('app');

    /** Layout directive controller */
    var LayoutController = function ($scope, $cookies, $rootScope, $location, $route, UserService) {

        $scope.$on('$routeChangeSuccess', function(){
            $scope.updateLayoutData();
        });

        // TODO: Set the logged user in the scope
        $scope.updateLayoutData= function(){

        };

    };

    /** Layout directive. Wraps every view in the application. */
    app.directive('mainLayout', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "templates/partials/mainLayout.html",
            controller: [
                '$scope', '$cookies', '$rootScope', '$location', '$route','UserService',
                function ($scope, $cookies, $rootScope, $location, $route, UserService) {
                    return new LayoutController($scope, $cookies, $rootScope, $location, $route, UserService);
                }]
        };
    });
})();
