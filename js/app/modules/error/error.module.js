(function() {
    'use strict';
    angular.module('error', [])
    // routes for the module
   	.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/error/:errorCode?', {
                templateUrl: 'js/app/modules/error/partials/error.html',
                controller: 'ErrorCtrl'
            });
        }
    ]);
})();