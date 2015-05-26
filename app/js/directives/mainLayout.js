(function () {
    "use strict";

    var app = angular.module('app');

    /** Layout directive controller */
    var LayoutController = function ($scope, $cookies, $rootScope, $location, $route, UserService) {

        $scope.$on('$routeChangeSuccess', function(){
            $scope.updateLayoutData();
        });

        // TODO: This function has to be called when:
        // -> The user is logged in
        // -> The user is logged out
        $scope.updateLayoutData= function(){

            if (UserService.isLogged() && $scope.user === undefined){
                $scope.user= UserService.getUser();
            }else{
                console.log('Not logged');
            }

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
