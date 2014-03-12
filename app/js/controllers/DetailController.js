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
                // TODO
            };

            $scope.getImage = function (id) {
                if (!id) {
                    return "";
                } else {
                    return "/img/catalog/" + id + ".jpg";
                }
            };

            $scope.getCSSRating = function (comments) {
                if (!comments) {
                    return [];
                }
                var rating = 0;
                for (var i = 0; i < comments.length; i++) {
                    rating += comments[i].rate;
                }
                rating = Math.floor(rating / comments.length);

                var css = ['rating'];

                if (rating) {
                    switch (rating) {
                        case 1:
                            css.push("one");
                            break;
                        case 2:
                            css.push("two");
                            break;
                        case 3:
                            css.push("three");
                            break;
                        case 4:
                            css.push("four");
                            break;
                        case 5:
                            css.push("five");
                            break;
                        default :
                            css.push("zero");
                    }
                    return css;
                }
            };
        }]);
}());