(function () {
    "use strict";

    var app = angular.module('app');

    /** Products catalog service. */
    var CatalogService = function (http) {

        /** Returns all products. Uses the JSON file */
        this.getCatalog = function () {
            return http.get('api/catalog').success(function (data) {
                /*Catalog loaded successfully.*/
            }).error(function (data) {
                /*ERROR loading catalog*/
            });
        };

        this.getProduct = function (pId) {
            return http.get('api/catalog/' + pId).success(function (data) {
                /*Catalog loaded successfully.*/
            }).error(function (data) {
                /*ERROR loading catalog*/
            });
        };
    };

    app.factory('catalogService', ['$http', function ($http) {
        return new CatalogService($http);
    }]);
}());