(function () {

    'use strict';

    //var apiUrl = 'http://dev.innovalangues.net/kinephone-api/web/index.php/kinephones/';
   // var apiUrl = 'http://localhost/innova/kinephone-api/web/index.php/kinephones/';

    angular.module('params').factory('ParamsServices', [
        '$resource', 'apiUrl',
        function ($resource, apiUrl) {
            return $resource(apiUrl + 'tables/:tid/params/:pid', {}, {
                query: {method: 'GET', isArray: false}, // get params for a given table
                update: {method: 'PUT', params: {tid: '@tid', pid: '@tid'}}
            });
        }]);


})();