(function () {
    "use strict";

    /** Product detail view controller */
    angular.module('app')
        .controller('DetailController', ['$scope', '$routeParams', 'catalogService', function ($scope, $routeParams, catalogService) {

            $scope.product = {};

            catalogService.getProduct($routeParams.id).success(function (result) {
                $scope.product = result;
            });

            $scope.quantity = 1;

            /** Add select item to user cart. */
            $scope.addToCart = function () {
                // TODO - not for first tp
            };

            $scope.getImage = function(id){
                // Not mandatory but allow to avoid an error in the console
            }

            $scope.getCSSRating = function (comments) {
               //TODO
            };
        }]);
}());