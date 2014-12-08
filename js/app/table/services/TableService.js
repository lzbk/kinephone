(function () {

    'use strict';

    /* angular.module('Table').factory('TableService', [
     '$resource', 
     'apiUrl',
     function ($resource, apiUrl) {
     return $resource(apiUrl + 'languages/:lid/table/:tid/items', {}, {
     query: {method: 'GET', isArray: false}
     });
     }]);*/

    angular.module('Table').factory('TableService', ['$http', '$q', '$filter', 'apiUrl',
        function ($http, $q, $filter, apiUrl) {

            var tableId = null; // current table id            
            var currentTable = {}; // selected table (binded to html select)

            return{
                getAvailableTables: function (id) {
                    var deferred = $q.defer();
                    deferred.notify();
                    $http.get(apiUrl + 'languages/' + id + '/tables')
                            .success(function (data) {
                                deferred.resolve(data);
                            });
                    return deferred.promise;
                },
                setCurrentTable: function (tables, id) {
                    currentTable = $filter('filter')(tables, {
                        table_id: id
                    })[0];
                    // if we change the language via drop down menu, there is no corresponding table Id 
                    // so we select the first one by default
                    if (!currentTable) {
                        currentTable = tables[0];
                    }
                    return currentTable;
                },
                getCurrentTable: function () {
                    return currentTable;
                },
                setCurrentTableId: function (id) {
                    tableId = id;
                },
                getCurrentTableId: function () {
                    return tableId;
                },
                getTableData: function (lid, tid) {
                    var deferred = $q.defer();
                    deferred.notify();
                    $http.get(apiUrl + 'languages/' + lid + '/table/' + tid + '/items')
                            .success(function (data) {
                                deferred.resolve(data);
                            });
                    return deferred.promise;
                },
                getItemDetails: function (items, id) {
                    var currentDetails = $filter('filter')(items, {
                        id: id
                    })[0];
                    return currentDetails;
                },
                getSound: function (sounds, gender, type) {
                    var currentSound = $filter('filter')(sounds, {
                        gender: gender,
                        type: type
                    })[0];
                    return currentSound;
                }
            };
        }]);



})();
