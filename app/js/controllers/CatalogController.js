(function () {
    "use strict";

    /** Catalog view controller */
    angular.module('app')
        .controller('CatalogController', ['$scope', '$location', 'catalogService','ProductUtils', 'UserService', function ($scope, $location, catalogService, ProductUtils, UserService) {

            $scope.currentPage = 1;
            $scope.nbResults = 3;

            /*$scope.getNbPages = function() {
                return $scope.products != undefined ? Math.ceil($scope.products.length / $scope.nbResults) : 0;
            };*/

            /** Returns all products. */
            catalogService.getCatalog().success(function (result) {
                $scope.products = result;
            });

            $scope.getRatingClass = ProductUtils.getRatingCss;

            $scope.addToCart = function(pItem){
                 UserService.addToCart(pItem,1);
                 $location.path('/basket');
            };
        }]);
}());