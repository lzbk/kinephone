(function() {
    'use strict';
    // Declare app level module
    angular.module('main', [
        'ngRoute', 
        'ngSanitize', 
        'ui.bootstrap',
        'angular-spinkit',         
        'angular-gestures', 
        'toggle-switch', 
        'table', 
        'params', 
        'error',
        'common'
    ]);

    // rest api base url dev
    //angular.module('main').value('apiUrl', 'http://localhost/innova/kinephone-api/web/index.php/kinephones/');
    // rest api base url prod
    angular.module('main').value('apiUrl', 'http://dev.innovalangues.net/kinephone-api/web/index.php/kinephones/');
})();