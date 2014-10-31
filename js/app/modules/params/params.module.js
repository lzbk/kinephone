(function() {
    'use strict';
    angular.module('params', [
        'angular-gestures',
        'error'
    ])
    // routes for the module
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/:lang/:table/params', {
                templateUrl: 'js/app/modules/params/partials/params.html',
                controller: 'ParamsCtrl'
            });
        }
    ]);
})();