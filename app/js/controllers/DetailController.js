/** Product detail view controller */
angular.module('app')
    .controller('DetailController', ['$scope','$routeParam', 'catelogService', function($scope, $routeParams, catalogService) {

	catalogService.getProduct($routeParams.id).success(function(result){
        $scope.product = result;
    });
	
	$scope.quantity = 1;
	
	/** Add select item to user cart. */
	$scope.addToCart = function() {
		// TODO
	};
}]);