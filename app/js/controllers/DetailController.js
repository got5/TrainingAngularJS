(function () {
    "use strict";

    /** Product detail view controller */
    angular.module('app')
        .controller('DetailController', ['$scope', '$routeParams', 'catalogService', 'ProductUtils', function ($scope, $routeParams, catalogService, productUtils) {

            $scope.product = {};

            catalogService.getProduct($routeParams.id).success(function (result) {
                $scope.product = result;
            });

            $scope.quantity = 1;

            /** Add select item to user cart. */
            $scope.addToCart = function () {
                // TODO
            };

            $scope.getImage = function (id) {
                if (!id) {
                    return "";
                } else {
                    return "/img/catalog/" + id + ".jpg";
                }
            };

            $scope.getCSSRating = function() {
                if ($scope.product != undefined) {
                    return productUtils.getRatingCss($scope.product);
                }
                return null;
            };

        }]);
}());