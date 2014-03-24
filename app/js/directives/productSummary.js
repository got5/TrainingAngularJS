/**
 * Created by pierremarot on 14/03/2014.
 */

(function(){
    "use strict";

    /** Directive controller */
    var ProductSummaryController = function($scope, UserService, productUtils) {

        /** Add select item to user cart. */
        $scope.addToCart = function(pItem) {
            UserService.addToCart(pItem, 1);
        };

        $scope.getRatingClass = productUtils.getRatingCss;
    };

    /** Product summary directive */
    angular.module('app')
    .directive('productSummary', function() {
        return {
            restrict : 'E',
            templateUrl : "templates/partials/productSummary.html",
            controller : [
                '$scope',
                'UserService',
                'ProductUtils',
                function(scope, UserService, productUtils) {
                    return new ProductSummaryController(scope, UserService,
                        productUtils);
                } ]
        };
    });
}());