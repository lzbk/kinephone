(function () {
    'use strict';

    angular.module('Header').controller('HeaderCtrl', [
        '$scope',
        '$location',
        '$route',
        'ConfigService',
        'HeaderService',
        'TranslationService',
        'LanguageService',
        'TableService',
        function ($scope, $location, $route, ConfigService, HeaderService, TranslationService, LanguageService, TableService) {

            $scope.languages = {}; // available languages
            $scope.tables = {}; // available tables for a given language 
            $scope.config = {}; // app config
            $scope.langId = null; // current lang id
            $scope.tableId = null; // current table id
            $scope.selectedLanguage = {}; // selected language binded to html select
            $scope.selectedTable = {};
            $scope.isAuthenticated = HeaderService.getIsAuthenticated(); // is user authenticated ?
            $scope.gender = HeaderService.getGender(); // default gender
            $scope.isSilentWay = false; // silent way means that when you tap on an item you won't here the sound but see details
            $scope.login = '';
            $scope.pass = '';

            // get app config
            ConfigService.query({}, function (e) {
                $scope.config = e;
            });
            
            // get translation
            TranslationService.getTranslation($scope, 'fr');

            // get available languages           
            var lPromise = LanguageService.getAvailableLanguages();
            lPromise.then(function (data) {
                $scope.languages = data;
                $scope.langId = LanguageService.getCurrentLanguageId();
                $scope.selectedLanguage = LanguageService.setCurrentLanguage($scope.languages, $scope.langId);
                getTables(false);
            });

            // get available tables for the current language
            function getTables(reload) {
                var tPromise = TableService.getAvailableTables($scope.langId);
                tPromise.then(function (data) {
                    $scope.tables = data;
                    // when changing language, if we dont select a new table, the current tableId is not updated
                    if(reload){
                        TableService.setCurrentTableId($scope.tables[0].table_id);
                    }
                    $scope.tableId = TableService.getCurrentTableId();                    
                    $scope.selectedTable = TableService.setSelectedTable($scope.tables, $scope.tableId); 
                });
            }

            $scope.genderChanged = function (value) {
                $scope.gender = value || 'male';
                HeaderService.setGender($scope.gender);
            };

            $scope.eventModeChange = function () {
                $scope.isSilentWay = !$scope.isSilentWay;
                HeaderService.setIsSilentWay($scope.isSilentWay);
            };
            
            $scope.signIn = function () {
                if ($scope.login == $scope.config.user_config.login && $scope.pass == $scope.config.user_config.pass) {
                    $scope.isAuthenticated = true;
                    HeaderService.setIsAuthenticated($scope.isAuthenticated);
                }
            };
            
            $scope.signOut = function () {
                $scope.login = null;
                $scope.pass = null;
                $scope.isAuthenticated = false;
                HeaderService.setIsAuthenticated($scope.isAuthenticated);
            };
            
            $scope.onLanguageChange = function () {
                $scope.langId = $scope.selectedLanguage.language_id;
                LanguageService.setCurrentLanguageId($scope.langId);
                // update corresponding table list && current table id
                getTables(true);
            };
            
            $scope.onTableChange = function () {
                $scope.tableId = $scope.selectedTable.table_id;
                TableService.setCurrentTableId($scope.tableId);
            };
            
            $scope.reloadData = function () {
                //console.log($route.current.controller);
                var ctrl = $route.current.controller;
                var path = '/' + $scope.selectedLanguage.language_id + '/' + $scope.selectedTable.table_id;
                if(ctrl === 'TableCtrl'){
                    console.log('table');
                    path +=  '/table';
                }
                else if(ctrl === 'ParamsCtrl'){
                    console.log('params');
                    path +=  '/params';
                }
                
                $location.path(path);
                $location.replace();

            };
        }
    ]);
})();
