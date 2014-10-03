(function () {
    "use strict";

    /** Basket view controller */
    angular.module('app')
        .controller('BasketController', ['$scope', 'UserService', 'User' , function ($scope, UserService) {
            $scope.items = UserService.getCurrentUser().cart.getItems();
            $scope.nbItems = $scope.items.length;
            $scope.getTotal = function () {
                var total = 0;
                for(var index = 0 ; index < $scope.items.length ; index++){
                    total += $scope.items[index].qty * $scope.items[index].price;
                }
                return total;
            };
        }]);
})();