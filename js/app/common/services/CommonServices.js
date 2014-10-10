'use strict';
/* Services */

var services = angular.module('services', ['ngResource']);


var apiUrl = 'http://dev.innovalangues.net/kinephone-api/web/index.php/kinephones/';
//var apiUrl = 'http://localhost/innova/kinephone-api/web/index.php/kinephones/';
services.value('version', '1.1');

services.factory('Data',['$resource', function($resource){
	
    return { 
		items : $resource( apiUrl + 'languages/:lid/table/:tid/items', {}, {
	    	query: {method:'GET', isArray: false} // get all datas for a language id and a table id
	    }),
	    languages : $resource( apiUrl + 'languages', {}, {
	    	query: {method:'GET', isArray: true} // get all available languages
	    }),
	    tables : $resource(apiUrl + 'languages/:lid/tables', {}, {
	    	query: {method:'GET', isArray: true} // get all available tables for a given language
	    }),
	    params : $resource(apiUrl + 'tables/:tid/params/:pid', {}, {
	    	query: {method:'GET', isArray: false}, // get params for a given table
	    	update: {method:'PUT', params: {tid: '@tid', pid:'@tid'}}
	    })
	};
}]);


services.factory('Config', ['$resource', function($resource) {
    return $resource('config/config.json', {}, {
        query: {method: 'GET', isArray: false}
    });
}]);

services.factory('Translation', ['$resource', function($resource){
	return{
		getTranslation : function($scope, language) {
            var languageFilePath = 'translations/translation_' + language + '.json';
            $resource(languageFilePath).get(function (data) {
                $scope.translation = data;
            });
        }
	};
}]);
