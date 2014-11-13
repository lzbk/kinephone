(function () {
    'use strict';
    var apiUrl = 'http://dev.innovalangues.net/kinephone-api/web/index.php/kinephones/';
    //var apiUrl = 'http://localhost/innova/kinephone-api/web/index.php/kinephones/';

    angular.module('main').factory('MainServices', [
        '$resource',
        function ($resource) {
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