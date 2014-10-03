'use strict';

// Declare app level module
var mainApp = angular.module(
    'mainApp', 
    [
        'ngRoute',
        'ui.bootstrap', 
        'ui.bootstrap.progressbar', 
        'services',
        'angular-gestures',
        'toggle-switch',                
        'tableApp',
        'paramsApp',
        'errorApp'
    ]);

// basic route provider is redirecting to home
/*mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/:lang/:table', {
            controller: 'MainCtrl'
        });
    }
]);*/
// FILTERS
mainApp.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    };
});

// main controller
mainApp.controller('MainCtrl', MainCtrl);

// MAIN FACTORIES
mainApp.factory('UtilsFactory', UtilsFactory);
mainApp.factory('MainFactory', MainFactory);
