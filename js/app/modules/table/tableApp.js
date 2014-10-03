'use strict';

var tableApp = angular.module('tableApp', ['angular-gestures', 'errorApp']);

// routes for the module
tableApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/:lang/:table/table', {
            templateUrl: 'js/app/modules/table/partials/table.html',
            controller: 'TableCtrl'
        });
    }
]);