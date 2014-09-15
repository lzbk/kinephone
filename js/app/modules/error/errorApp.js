'use strict';

var errorApp = angular.module('errorApp', []);

// routes for the module
errorApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/error/:errorCode?', {
            templateUrl: 'js/app/modules/error/partials/error.html',
            controller: 'ErrorCtrl'
        });
    }
]);