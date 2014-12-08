(function() {
    'use strict';
    angular.module('Params', [
        'angular-gestures',
        'ui.bootstrap',
        'toggle-switch',
        'Header',
        'Language',
        'Table'
    ])
    // routes for the module
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/:lang/:table/params', {
                templateUrl: 'js/app/params/partials/params.html',
                controller: 'ParamsCtrl',
                
                resolve:{
                    params: function ($route, ParamsService){
                        var routeParams = $route.current.params;
                        var tid = routeParams.table;                        
                        var params = ParamsService.getTableParams(tid); 
                        return params;
                    }
                }
            });
        }
    ]);
})();
