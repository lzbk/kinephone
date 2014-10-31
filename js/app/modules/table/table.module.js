(function() {
    'use strict';
    angular.module('table', [
        'angular-gestures', 
        'error'
    ])   
    // routes for the module
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/:lang/:table/table', {
                templateUrl: 'js/app/modules/table/partials/table.html',
                controller: 'TableCtrl'
            });
        }
    ]);
})();