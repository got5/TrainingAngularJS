/** Products catalog service. */
var CatalogService = function(http) {
	
	/** Returns all products. Uses the JSON file */
	this.getCatalog = function () {
		return http.get('api/catalog').success(function(data) {
			console.log('Catalog loaded successfully.');
		}).error(function(data) {
			console.error('ERROR loading catalog: ' + data);
		});
	};

	this.getProduct = function(pId) {
        return http.get('api/catalog/'+pId).success(function(data) {
            console.log('Catalog loaded successfully.');
        }).error(function(data) {
            console.error('ERROR loading catalog: ' + data);
        });
	};
};

app.factory('CatalogService', ['$http', function($http) {
	return new CatalogService($http);
}]);