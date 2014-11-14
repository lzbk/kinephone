(function () {

    'use strict';

    //var apiUrl = 'http://dev.innovalangues.net/kinephone-api/web/index.php/kinephones/';
    var apiUrl = 'http://localhost/innova/kinephone-api/web/index.php/kinephones/';

    angular.module('table').factory('TableDataService', [
        '$resource',
        function ($resource) {
            return $resource(apiUrl + 'languages/:lid/table/:tid/items', {}, {
                query: {method: 'GET', isArray: false}
            });
        }]);


})();