/** Catalog view controller */
angular.module('app')
    .controller('CatalogController',['$scope','catalogService', function($scope, catalogService) {

	/** Returns all products. */
	catalogService.getCatalog().success(function(result) {
		$scope.products = [];
		for(var id in result.products) {
			$scope.products.push(result.products[id]);
		}
	});
}]);