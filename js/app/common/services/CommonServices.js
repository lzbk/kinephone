(function () {

    'use strict';

    //var apiUrl = 'http://dev.innovalangues.net/kinephone-api/web/index.php/kinephones/';
    var apiUrl = 'http://localhost/innova/kinephone-api/web/index.php/kinephones/';

    angular.module('common', ['ngResource'])

            .factory('Config', ['$resource', function ($resource) {
                    return $resource('config/config.json', {}, {
                        query: {method: 'GET', isArray: false}
                    });
                }])

            .factory('Translation', ['$resource', function ($resource) {
                    return{
                        getTranslation: function ($scope, language) {
                            var languageFilePath = 'translations/translation_' + language + '.json';
                            $resource(languageFilePath).get(function (data) {
                                $scope.translation = data;
                            });
                        }
                    };
                }]);


})();