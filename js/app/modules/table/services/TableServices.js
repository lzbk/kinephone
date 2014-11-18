(function () {

    'use strict';

    angular.module('table').factory('TableDataService', [
        '$resource', 'apiUrl',
        function ($resource, apiUrl) {
            return $resource(apiUrl + 'languages/:lid/table/:tid/items', {}, {
                query: {method: 'GET', isArray: false}
            });
        }]);


})();