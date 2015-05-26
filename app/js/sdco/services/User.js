(function() {
    "use strict";

    var User = function (login, password) {
        this.login = login;
        this.password = password;
        this.cart = []
    };

    angular.module('app')
        .value('User', {
            createUser: function (login, password) {
                return new User(login, password);
            }
        });
}());