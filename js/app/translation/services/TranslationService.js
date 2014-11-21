(function () {

    'use strict';

    angular.module('Translation').factory('TranslationService', ['$resource',
        function ($resource) {
            return{
                getTranslation: function (scope, language) {
                    var languageFilePath = 'translations/translation_' + language + '.json';
                    $resource(languageFilePath).get(function (data) {
                        scope.translation = data;
                    });
                }
            };
        }]);


})();
