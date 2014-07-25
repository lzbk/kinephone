'use strict';

var homeApp = angular.module('homeApp', []);

// routes for the module
homeApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/home/:langue/:methode?/:genre?', {
            templateUrl: 'js/app/modules/home/partials/home.html',
            controller: 'HomeCtrl'
        });
    }
]);

