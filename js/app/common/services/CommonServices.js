'use strict';
/* Services */

var services = angular.module('services', ['ngResource']);

services.value('version', '1.1');

services.factory('Datas',['$resource', function($resource){
	return $resource('elements/:language/:method.json', {}, {
		// get all datas with default params
      	query: {method:'GET', params:{language:'uk', method:'gattegno'}, isArray:false}
    });


}]);