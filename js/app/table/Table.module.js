(function() {
    'use strict';
    angular.module('Table', [
        'ngRoute',
        'ngResource',
        'ngSanitize',
        'ui.bootstrap',
        'angular-gestures',
        'Language',
        'Params'
    ])   
    // routes for the module
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/:lang/:table/table', {
                templateUrl: 'js/app/table/partials/table.html',
                controller: 'TableCtrl',
                resolve:{
                    tableData: function ($route, TableService){
                        var routeParams = $route.current.params;
                        var lid = routeParams.lang;
                        var tid = routeParams.table;                        
                        var tableData = {};                        
                        tableData = TableService.getTableData(lid, tid);
                        return tableData;
                    },
                    tableParams:function($route, ParamsService){
                        var routeParams = $route.current.params;
                        var tid = routeParams.table;
                        var tableParams = ParamsService.getTableParams(tid);
                        return tableParams;
                    }
                }
            })
                    .otherwise({
                        redirectTo: '/en_gb/1/table'
                    });
        }
    ]);
})();
