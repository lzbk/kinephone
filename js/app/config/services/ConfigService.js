(function () {

    'use strict';

    angular.module('Config').factory('ConfigService', ['$resource',
        function ($resource) {
            return $resource('js/app/config/config.json', {}, {
                query: {method: 'GET', isArray: false}
            });
        }]);


})();
