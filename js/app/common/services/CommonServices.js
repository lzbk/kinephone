'use strict';
/* Services */

var services = angular.module('services', ['ngResource']);

services.value('version', '1.1');

services.factory('Data',['$resource', function($resource){
    return $resource('http://dev.innovalangues.net/kinephone-api/web/index.php/kinephones/:langId', {method:'@method'}, {
    	query: {method:'GET', isArray: false}
    });
}]);