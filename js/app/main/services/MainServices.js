(function() {
    'use strict';
    angular.module('Main').factory('MainServices', ['$http', '$q', '$filter', 'apiUrl',
        function($http, $q, $filter, apiUrl) {

            return {
                getAvailableLanguages: function() {
                    var deferred = $q.defer();
                    deferred.notify();
            
                    $http.get(apiUrl + 'languages', {})
                    .success(function (data) {
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                },
                setCurrentLanguage : function(languages, id){
                    return $filter('filter')(languages, {
                        language_id: id
                    })[0];         
                },
                getLanguageTables: function(id) {                   
                    var deferred = $q.defer();
                    deferred.notify();                    
                    $http.get(apiUrl + 'languages/'+id+'/tables')
                    .success(function (data) {
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                },
                setCurrentTable : function(tables, id) {
                    var selectedTable = $filter('filter')(tables, {
                        table_id: id
                    })[0];

                    // if we change the language via drop down menu, there is no corresponding table Id 
                    // so we select the first one by default
                    if (!selectedTable) {  
                        selectedTable = tables[0];                       
                    }
                    return selectedTable;
                }
            };
        }
    ]);
})();
