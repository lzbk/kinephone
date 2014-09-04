'use strict';

var homeApp = angular.module('homeApp', ['hmTouchEvents']);

// routes for the module
homeApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/home/:lang/:method?', {
            templateUrl: 'js/app/modules/home/partials/home.html',
            controller: 'HomeCtrl'
        });
    }
]);

