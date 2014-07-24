'use strict';

var configApp = angular.module('configApp', []);

// routes for the module
configApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/config', {
            templateUrl: 'js/app/modules/config/partials/config.html',
            controller: 'ConfigCtrl'
        });
    }
]);

