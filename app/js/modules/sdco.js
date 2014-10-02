(function () {
    "use strict";

    /** User cart. */
    var Address = function (firstName, lastName, address, postalCode, town, isDefault) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.postalCode = postalCode;
        this.town = town;

        /** Is this the default shipping address? */
        this.isDefault = isDefault;

        this.getHTML = function () {
            var htmlAddress = this.firstName + " " + this.lastName + "<br/>";
            htmlAddress += address + "<br/>";
            htmlAddress += this.postalCode + " " + this.town;
            return htmlAddress;
        };
    };

    var Cart = function (pCartItems) {

        var items = null;

        /** Defines cart items. */
        this.setItems = function (pItems) {
            items = {};
            if (pItems) {
                for (var index = 0; index < pItems.length; index++) {
                    var cartItem = pItems[index];
                    items[cartItem.id] = cartItem;
                }
            }
        };

        /** Returns all cart items. */
        this.getItems = function () {
            var arrItems = [];
            for (var key in items) {
                arrItems.push(items[key]);
            }
            return arrItems;
        };

        /** Sets the quantity for a given item. It will be added if not in the cart. */
        this.setItemQty = function (pItem, pQty) {
            if (pQty > 0) {
                if (items[pItem.id] === undefined) {
                    items[pItem.id] = new CartItem(pItem, pQty);
                } else {
                    items[pItem.id].qty += pQty;
                }
            }
        };

        /** Returns the quantity for a given item. */
        this.getItemQty = function (pItem) {
            return items[pItem.id] !== undefined ? items[pItem.id].qty : 0;
        };

        this.addItem = function (pItem) {
            this.setItemQty(pItem, 1);
        };

        this.removeItem = function (pItem) {
            this[pItem.id] = undefined;
        };

        this.setItems(pCartItems);
    };
    /** Cart item */
    var CartItem = function (pItem, pQty) {
        this.id = pItem.id;
        this.name = pItem.name;
        this.price = pItem.price;
        this.qty = pQty;
    };
    /** User VO */
    var User = function (pId, pFirst, pLast, pLogin, pPass, pMail, pCartItems, pRole, pAddresses) {
        this.id = pId;
        this.firstName = pFirst;
        this.lastName = pLast;
        this.login = pLogin;
        this.password = pPass;
        this.mail = pMail;
        this.cart = new Cart(pCartItems);
        this.role = pRole;

        this.addresses = [];
        if (pAddresses) {
            for (var index = 0; index < pAddresses.length; index++) {
                var addr = pAddresses[index];
                this.addresses.push(new Address(addr.firstName, addr.lastName, addr.address, addr.postalCode,
                    addr.town, addr.isDefault));
            }
        }
    };

    angular.module('sdcoServices', [])
        .value('User', {
            createUser: function (pId, pFirst, pLast, pLogin, pPass, pMail, pCartItems, pRole, pAddresses) {
                return new User(pId, pFirst, pLast, pLogin, pPass, pMail, pCartItems, pRole, pAddresses);
            },
            createCart: function(pItems){
                return new Cart(pItems);
            }
    });



    /** Service which handle all user logic. */
    var UserService = function ($http, $q, $log, $cookies, $cookieStore, isDebugMode) {


        this.logUser = function (login, password) {
            // We create a promise to offer the possibility to users to call some functions after the
            // asynchronous call of $http.get.
            var deferred = $q.defer();

            /** Gets all users... */
            $http.post('/api/login', {login: login, password: password})
            .success(function (user) {
                    isDebugMode && $log.info('Authentication successed !');
                    $cookieStore.put('user', user);
                    deferred.resolve(user);
                })
                .error(function (reason) {
                    isDebugMode && $log.error('unable to log  ' + reason);
                    deferred.reject("Bad login and/or password");
                });

            // A promise is returned, so we can make: userService.logUser(u, p).then(success, error).
            return deferred.promise;
        };
    };

    /** Registers our service in a new sub module. */
    angular.module('sdcoServices').provider('UserService',function() {

        var isDebugMode = false;

        this.setDebugMode = function (pIsDebug) {
            isDebugMode = pIsDebug;
        };

        this.$get = [ '$http', '$q', '$log', '$cookies', '$cookieStore', function ($http, $q, $log, $cookies, $cookieStore) {
            return new UserService($http, $q, $log, $cookies, $cookieStore, isDebugMode);
        }];
    });

})();