(function () {

    'use strict';    
    angular.module('Params').factory('ParamsService', [
        '$http', 
        '$q', 
        'apiUrl',
        function ($http, $q, apiUrl) {            

            return{
                getTableParams: function (id) {
                    var deferred = $q.defer();
                    deferred.notify();                    
                    $http.get(apiUrl + 'tables/'+id+'/params')
                    .success(function (data) {
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                },
                updateParams: function(tid, pid, params){
                    var deferred = $q.defer();
                    deferred.notify();                    
                    $http.put(apiUrl + 'tables/' + tid + '/params/' + pid, params)
                    .success(function (data) {
                        deferred.resolve(data);                        
                    }).error(function(data, status, header, config){
                        //deferred.resolve(data);
                        deferred.resolve(data);
                    });
                    return deferred.promise;                    
                }
            };
        }]);
})();

