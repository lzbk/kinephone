(function () {
    'use strict';
    angular.module('App', [
        'angular-gestures',
        'Header',
        'Language',
        'Table'
    ])

    // rest api base url dev
    //.value('apiUrl', 'http://localhost/innova/kinephone-api/web/index.php/kinephones/')
    // rest api base url prod
    .value('apiUrl', 'http://dev.innovalangues.net/kinephone-api/web/index.php/kinephones/')

    .run([
        '$rootScope', 
        '$routeParams',
        'LanguageService',
        'TableService',
        function ($rootScope, $routeParams, LanguageService, TableService) {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {                
                // current is the current route
                // previous is the previous route
                var langId = $routeParams.lang ? $routeParams.lang : 1;
                var tableId = $routeParams.table ? $routeParams.table : 1;
                LanguageService.setCurrentLanguageId(langId);
                TableService.setCurrentTableId(tableId); 
            });             
    }]);
})();
