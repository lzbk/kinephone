(function () {
    'use strict';
    angular.module('main').factory('MainServices', [
        '$resource', 'apiUrl',
        function ($resource, apiUrl) {
            return {
                languages: $resource(apiUrl + 'languages', {}, {
                    query: {method: 'GET', isArray: true} // get all available languages
                }),
                tables: $resource(apiUrl + 'languages/:lid/tables', {}, {
                    query: {method: 'GET', isArray: true} // get all available tables for a given language id
                })
            };
        }]);
})();