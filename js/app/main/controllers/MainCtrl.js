(function () {
    'use strict';

    angular.module('Main').controller('MainCtrl', [
        '$scope',
        '$timeout',
        '$location',
        '$routeParams',
        '$modal',
        'MainServices',
        'ConfigService',
        'TranslationService',
        function ($scope, $timeout, $location, $routeParams, $modal, MainServices, ConfigService, TranslationService) {
            $scope.languages = {}; // available languages
            $scope.tables = {}; // available tables for a given language 
            $scope.config = {}; // app config
            $scope.langId = null; // current lang id
            $scope.tableId = null; // current table id
            $scope.selectedLanguage = {}; // selected language binded to html select
            $scope.selectedTable = {};
            $scope.isAuthenticated = false; // is user authenticated ?
            $scope.gender = 'male'; // default gender
            $scope.isSilentWay = false; // silent way means that when you tap on an item you won't here the sound but see details
            $scope.login = '';
            $scope.pass = '';

            // open wait modal while retrieving data. Will be closed when table data are ready...
            $scope.waitModalInstance;
            function showPleaseWaitModal() {
                $scope.waitModalInstance = $modal.open({
                    templateUrl: 'js/appmodals/partials/waitModal.html',
                    controller: 'WaitModalCtrl',
                    scope: $scope,
                    backdrop: 'static'
                });
            }
            showPleaseWaitModal();

            $scope.$on('tableDataReady', hidePleaseWaitModal);

            // get translation service
            // TranslationService.getTranslation($scope, 'fr');
            // here it is not possible to use $routeParams
            /*$scope.$on('$routeChangeSuccess', function (event, current, previous) {
                getConfig();
                getLanguages();
                console.log('youpi');
                // current is the current route
                // previous is the previous route
                $scope.langId = $routeParams.lang ? $routeParams.lang : 1;
                $scope.tableId = $routeParams.table ? $routeParams.table : 1;
                $scope.getTables($scope.langId);
                $timeout(function () {
                    $scope.$broadcast('mainDataReady');
                }, 200);
            });*/
            // on document ready
            /*angular.element(document).ready(function () {
               
            });*/
            
            $scope.genderChanged = function (value) {
                $scope.gender = value || 'male';
            };
            $scope.eventModeChange = function () {
                $scope.isSilentWay = !$scope.isSilentWay;
            };
            $scope.signIn = function () {
                if ($scope.login == $scope.config.user_config.login && $scope.pass == $scope.config.user_config.pass) {
                    $timeout(function () {
                        $scope.isAuthenticated = true;
                        $scope.$apply();
                    }, 0);
                }
            };
            $scope.signOut = function () {
                $scope.login = "";
                $scope.pass = "";
                $scope.isAuthenticated = false;
            };
            $scope.onLanguageChange = function () {
                $scope.langId = $scope.selectedLanguage.language_id;
                $scope.getTables($scope.langId);
            };
            $scope.onTableChange = function () {
                $scope.tableId = $scope.selectedTable.table_id;                
            };
            $scope.reloadData = function () {
                showPleaseWaitModal();
                $scope.$broadcast('reloadData');
            };
            $scope.openHelp = function () {
                var helpModalInstance = $modal.open({
                    templateUrl: 'js/app/main/partials/helpModal.html',
                    controller: 'HelpModalCtrl',
                    scope: $scope
                });
                helpModalInstance.result.then(function () {
                    //on ok button press 
                }, function () {
                    //dismiss            
                });
            };
           
            // get app config
            function getConfig() {
                ConfigService.query({}, onConfigSuccess, onDataError);
            }

            function onConfigSuccess(e) {
                $timeout(function () {
                    $scope.config = e;
                    $scope.$apply();
                }, 0);
            }

            // get available languages
            function getLanguages() {               
                var promise = MainServices.getAvailableLanguages();
                promise.then(function(data){
                    $scope.languages = data;
                    $scope.selectedLanguage = MainServices.setCurrentLanguage($scope.languages, $scope.langId);
                });
            }

             // get available tables for the selected language
            $scope.getTables = function (id) {
                var promise = MainServices.getLanguageTables(id);
                promise.then(function(data){
                    $scope.tables = data;
                    $scope.selectedTable = MainServices.setCurrentTable($scope.tables, $scope.tableId);
                    $scope.tableId = $scope.selectedTable.table_id;
                });
            };

            function hidePleaseWaitModal() {
                $scope.waitModalInstance.close();
            }

            function onDataError(e) {
                $location.path("/error/" + e.status);
                $location.replace();
            }
        }
    ]);
})();
