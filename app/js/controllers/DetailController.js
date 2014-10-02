(function () {
    "use strict";

    /** Product detail view controller */
    angular.module('app')
        .controller('DetailController', ['$scope', '$location', '$routeParams', 'catalogService', 'ProductUtils', 'UserService',
            function ($scope, $location, $routeParams, catalogService, productUtils, UserService) {

            $scope.product = {};

            catalogService.getProduct($routeParams.id).success(function (result) {
                $scope.product = result;
            });

            $scope.quantity = 1;

            /** Add select item to user cart. */
            $scope.addToCart = function (pItem, qty) {
                UserService.addToCart(pItem,qty);
                $location.path('/basket');
            };

            $scope.getImage = function (id) {
                if (!id) {
                    return "";
                } else {
                    return "/img/catalog/" + id + ".jpg";
                }
            };

            $scope.getCSSRating =  productUtils.getRatingCss;


        }]);
})();