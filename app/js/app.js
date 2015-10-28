(function () {
    "use strict";

    var app = angular.module('app', [ 'ngCookies', 'ngRoute','ngResource', 'ui.bootstrap']);

    /** Services configuration */
    app
    .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {

            $locationProvider.html5Mode(false);

            $routeProvider.when('/', {
                templateUrl: 'templates/views/home.html',
                controller: 'HomeController'
            }).when('/login', {
                templateUrl: 'templates/views/login.html',
                controller: 'LoginController',
                access: null
            }).when('/books', {
                templateUrl: 'templates/views/catalog.html',
                controller: 'CatalogController',
                access: null
            }).when('/book/:id', {
                templateUrl: 'templates/views/detail.html',
                controller: 'DetailController',
                access: null
            }).when('/basket', {
                templateUrl: 'templates/views/basket.html',
                controller: 'BasketController',
                access: null
            }).when('/profile', {
                templateUrl: 'templates/views/profile.html',
                controller: 'ProfileController',
                access: null
            }).when('/404', {
                templateUrl: 'templates/views/404.html',
                access: null
            }).otherwise({
                redirectTo: '/404'
            });

            $httpProvider.interceptors.push(function ($q, $rootScope) {
                return {
                    // 'response': function(response){
                    //     return response;
                    // },
                   'responseError': function(rejection) {
                        if (rejection.status === 403){
                            $rootScope.$broadcast('403_UNAUTHORIZED');
                            return rejection;
                        }
                        return $q.reject(rejection);
                    }
                };
            });

        }
    ])
    .run(['$http', '$cookies', '$rootScope', '$location', '$route',
        function( $http, $cookies, $rootScope, $location, $route){
        //$http.defaults.headers.common.Authentication = $cookies.token;

            $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            $route.reload();
            $rootScope.$on('403_UNAUTHORIZED', function(){
               $location.path('/login');
           });
    }]);
})();
