'use strict';

// Declare app level module
var mainApp = angular.module(
    'mainApp', 
    [
        'ngRoute',
        'ngAnimate',
        'ui.bootstrap', 
        'ui.bootstrap.progressbar',         
        'homeApp',
        'configApp',
        'services' 
    ]);

// basic route provider is redirecting to home
mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            redirectTo: '/home/uk/gattegno'
        });
    }
]);
// FILTERS
mainApp.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    };
});
mainApp.filter('flToHHmmss', function() {
    return function(value) {
        value = Number(value);
        if (value > 0) {
            var hours = Math.floor(value / 3600);
            var minutes = Math.floor(value % 3600 / 60);
            var seconds = Math.floor(value % 3600 % 60);
            // ms
            var str = value.toString();
            var substr = str.split('.');
            var ms = substr[1].substring(0, 2);
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = hours + ':' + minutes + ':' + seconds + ':' + ms;
            return time;
        } else {
            return "00:00:00:00";
        }
    };
});
// main controller
mainApp.controller('MainCtrl', MainCtrl);

// MAIN FACTORIES
mainApp.factory('UtilsFactory', UtilsFactory);
mainApp.factory('MainFactory', MainFactory);
