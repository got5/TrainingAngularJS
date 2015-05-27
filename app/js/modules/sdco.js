(function () {
    "use strict";


    angular.module('sdcoServices', [])
    .provider('UserService',function() {

        var isDebugMode = false;

        this.setDebugMode = function (pIsDebug) {
            isDebugMode = pIsDebug;
        };

        this.$get = [ '$http', '$q', '$log', '$cookies', function ($http, $q, $log, $cookies) {

            /** Service which handle all user logic. */
            var UserService = function ($http, $q, $log, $cookies, isDebugMode) {

                var currentUser;

                var cart=[];

                this.isLogged= function(){
                    return (currentUser!==undefined);
                };

                this.logUser = function (login, password) {
                    // We create a promise to offer the possibility to users to call some functions after the
                    // asynchronous call of $http.get.
                    var deferred = $q.defer();

                    /** Gets all users... */
                    $http.post('/api/login', {login: login, password: password})
                    .success(function (user) {
                        isDebugMode && $log.info('Authentication successed !');
                        currentUser= user;
                        $cookies.putObject('user', user);
                        deferred.resolve(user);
                    })
                    .error(function (reason) {
                        isDebugMode && $log.error('unable to log  ' + reason);
                        currentUser= undefined;
                        deferred.reject("Bad login and/or password");
                    });

                    // A promise is returned, so we can make: userService.logUser(u, p).then(success, error).
                    return deferred.promise;
                };

                this.getUser= function(){
                    return currentUser;
                }

                /** Add an item with a given quantity in the user basket. */
                this.addToCart = function (pItem) {
                    var user= this.getUser();
                    var cart= user.cart;
                    if (!cart){
                        cart= [];
                    }
                    user.cart= cart;
                    cart.push(pItem);
                    $cookies.putObject('user', user);
                };

                this.getCart= function(){
                    var user= this.getUser();
                    return user.cart;
                };

            };

            return new UserService($http, $q, $log, $cookies, isDebugMode);
        }];

    });

})();