/**
 * Created by pierremarot on 13/03/2014.
 */
(function(){
        /** Service which handle all user logic. */
        var UserService = function($http, $q, $log, $cookies, isDebugMode) {

        /** Currently logged user. */
        var currentUser = null;

        this.getCurrentUser = function() {
            if(!currentUser){
                currentUser = $cookies.user;
            }
            return currentUser;
        };

        this.logUser = function(login, password) {
            // We create a promise to offer the possibility to users to call some functions after the
            // asynchronous call of $http.get.
            var deferred = $q.defer();

                /** Gets all users... */
                $http.post('/api/login', {login: login, password:password})
                    .success(function (user) {
                        if(isDebugMode){
                            $log.info('Authentication successed !');
                        }
                        $http.defaults.headers.common.Authentication = user.token;
                        $cookies.token = user.token;
                        user.token = '' //not needed after this;
                        currentUser = user;
                        $cookies.user = user;
                        deferred.resolve(user);
                    })
                    .error(function (reason) {
                        if(isDebugMode){
                            $log.error('unable to log  ' + reason);
                        }
                        deferred.reject("Bad login and/or password");
                    });

            // A promise is returned, so we can make: userService.logUser(u, p).then(success, error).
            return deferred.promise;
        };
    };

    /** UserService provider. */
    function UserServiceProvider() {

        var isDebugMode = false;

        this.setDebugMode = function(pIsDebug) {
            isDebugMode = pIsDebug;
        };

        this.$get = [ '$http', '$q', '$log', '$cookies', function($http, $q, $log, $cookies) {
            return new UserService($http, $q, $log, $cookies, isDebugMode);
        }];
    };

    /** Registers our service in a new sub module. */
    angular.module('sdcoServices').provider('UserService', UserServiceProvider);
}());