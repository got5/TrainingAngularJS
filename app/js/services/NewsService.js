/**
 * Created by pierremarot on 12/03/2014.
 */
(function(){
    "use strict";
    angular.module('app')
        .factory('NewsService',['$resource', function ($resource) {
            return $resource('/api/news/:op/:id',{id:'@id'},{
            like: {method:'GET',params: {op:'like'}},
            random: {method:'GET',params:{op:'random'}}
                });
        }]);
}());