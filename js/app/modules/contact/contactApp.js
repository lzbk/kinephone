'use strict';

var contactApp = angular.module('contactApp', []);

// routes for the module
contactApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'js/app/modules/contact/partials/contact.html',
            controller: 'ContactCtrl'
        });
    }
]);