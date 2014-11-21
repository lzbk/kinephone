(function () {

    'use strict';

    angular.module('Language').factory('LanguageService', ['$http', '$q', '$filter', 'apiUrl',
        function ($http, $q, $filter, apiUrl) {
            
            var langId = null; // current lang id            
            var selectedLanguage = {}; // selected language binded to html select
            
            return{
                getAvailableLanguages: function () {
                    var deferred = $q.defer();
                    deferred.notify();

                    $http.get(apiUrl + 'languages', {})
                            .success(function (data) {
                                deferred.resolve(data);
                            });
                    return deferred.promise;
                },
                setCurrentLanguage: function (languages, id) {
                    selectedLanguage = $filter('filter')(languages, {
                        language_id: id
                    })[0];
                    return selectedLanguage;
                },
                getCurrentLanguage: function(){
                    return selectedLanguage;
                },
                setCurrentLanguageId: function(id){
                    langId = id;
                },
                getCurrentLanguageId: function(){
                    return langId;
                }
            };
        }]);


})();
