(function() {
    'use strict';
    // Declare app level module
    angular.module('Main', [
        'ngRoute', 
        'ngSanitize', 
        'ui.bootstrap',
        'angular-spinkit',         
        'angular-gestures', 
        'toggle-switch', 
        'Table', 
        'Params'
    ]);

    // rest api base url dev
    //angular.module('Main').value('apiUrl', 'http://localhost/innova/kinephone-api/web/index.php/kinephones/');
    // rest api base url prod
    //angular.module('main').value('apiUrl', 'http://dev.innovalangues.net/kinephone-api/web/index.php/kinephones/');
})();