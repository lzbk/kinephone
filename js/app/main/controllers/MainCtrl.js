(function () {
    'use strict';

    angular.module('main').controller('MainCtrl', [
        '$scope',
        '$timeout',
        '$location',
        '$filter',
        '$routeParams',
        '$modal',
        'MainServices',
        'Config',
        'Translation',
        function ($scope, $timeout, $location, $filter, $routeParams, $modal, MainServices, Config, Translation) {
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
                    templateUrl: 'js/app/common/modals/partials/waitModal.html',
                    controller: 'WaitModalCtrl',
                    scope: $scope,
                    backdrop: 'static'
                });
            }
            showPleaseWaitModal();

            $scope.$on('tableDataReady', hidePleaseWaitModal);

            // get translation service
            Translation.getTranslation($scope, 'fr');
            // here it is not possible to use $routeParams
            $scope.$on('$routeChangeSuccess', function (event, current, previous) {
                getConfig();
                getLanguages();
                // current is the current route
                // previous is the previous route
                $scope.langId = $routeParams.lang ? $routeParams.lang : 1;
                $scope.tableId = $routeParams.table ? $routeParams.table : 1;
                $scope.getTables($scope.langId);
                $timeout(function () {
                    $scope.$broadcast('mainDataReady');
                }, 200);
            });
            // on document ready
            angular.element(document).ready(function () {
               
            });
            
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

            // get available tables for the current language
            $scope.getTables = function (id) {
                MainServices.tables.query({
                    lid: id
                }, onTablesSuccess, onDataError);
            };            

            function onTablesSuccess(e) {
                $timeout(function () {
                    $scope.tables = e;
                    $scope.$apply();
                    setCurrentTable();
                }, 0);
            }

            function setCurrentTable() {
                $scope.selectedTable = $filter('filter')($scope.tables, {
                    table_id: $scope.tableId
                })[0];

                // if we change the language via drop down menu, there is no corresponding table Id so we have to select the first one
                if (!$scope.selectedTable) {  
                    $scope.selectedTable = $scope.tables[0];
                    $scope.tableId = $scope.tables[0].table_id;
                }
            }

            // get app config
            function getConfig() {
                Config.query({}, onConfigSuccess, onDataError);
            }

            function onConfigSuccess(e) {
                $timeout(function () {
                    $scope.config = e;
                    $scope.$apply();
                }, 0);
            }

            // get available languages
            function getLanguages() {
                MainServices.languages.query({}, onLanguagesSuccess, onDataError);
            }

            function onLanguagesSuccess(e) {
                $timeout(function () {
                    $scope.languages = e;
                    $scope.$apply();
                    setCurrentLanguage();
                }, 0);
            }

            function setCurrentLanguage() {
                $scope.selectedLanguage = $filter('filter')($scope.languages, {
                    language_id: $scope.langId
                })[0];
            }

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