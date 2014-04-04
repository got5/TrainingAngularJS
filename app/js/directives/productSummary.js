/**
 * Created by pierremarot on 14/03/2014.
 */

(function(){
    "use strict";

    /**
     * Created by pierremarot on 04/04/2014.
     */



    angular.module('app').directive('productSummary', ['ProductUtils', function (ProductUtils) {

        return {
            restrict: 'E',
            templateUrl: 'templates/partials/productSummary.html',
            scope:{
                product:'='
            },
            link: function (scope, element, attrs) {
                scope.getRatingClass = ProductUtils.getRatingCss;
            },
            controller: ['$scope',
                'UserService',
                function ($scope,UserService) {

                    $scope.addToCart = function (pItem) {
                        UserService.addToCart(pItem, 1);
                    };
                }]
        }

    }]);
}());