

'use strict';
/**
 *
 * @param {type} $scope scope
 */
function MainCtrl($scope, $timeout, $location, $filter, $routeParams, $modal, Data, Config, Translation) {
    $scope.languages = {}; // all languages available
    $scope.tables = {}; // all tables available for a given language    
    $scope.params = {}; // params for a given table
    $scope.config = {}; // app config
    $scope.langId = null; // current lang id
    $scope.tableId = null; // current table id
    $scope.isAuthenticated = false; // is user authenticated ?
    $scope.gender = 'male'; // default gender
    $scope.isSilentWay = false; // silent way means that when you tap on an item you won't here the sound but see details
    $scope.login = '';
    $scope.pass = '';
    $scope.currentLanguage = {}; // current language
    $scope.currentTable = {};

    // open wait modal while retrieving data. Will be closed by tableApp...
    $scope.waitModalInstance;
    function showPleaseWaitModal() {        
        $scope.waitModalInstance = $modal.open({
            templateUrl: 'js/app/common/modals/partials/waitModal.html',
            controller: 'WaitModalCtrl',
            scope: $scope,
            backdrop : 'static'
        });
    }
    showPleaseWaitModal();


    // get translation service
    Translation.getTranslation($scope, 'fr');
    // here it is not possible to use $routeParams
    $scope.$on('$routeChangeSuccess', function(event, current, previous) {
        // current is the current route
        // previous is the previous route
        $scope.langId = $routeParams.lang ? $routeParams.lang : 1;
        $scope.tableId = $routeParams.table ? $routeParams.table : 1;
        $scope.getTables($scope.langId);
        getTableParams($scope.tableId);
    });
    // on document ready
    angular.element(document).ready(function() {
        getConfig();
        getLanguages();
    });
    // get local config
    function getConfig() {
        Config.query({}, onConfigSuccess, onDataError);
    }

    function onConfigSuccess(e) {
        $timeout(function() {
            $scope.config = e;
            $scope.$apply();
        }, 0);
    }
    // get available languages
    function getLanguages() {
        Data.languages.query({}, onLanguagesSuccess, onDataError);
    }

    function onLanguagesSuccess(e) {
        $timeout(function() {
            $scope.languages = e;
            $scope.$apply();
            setCurrentLanguage();
        }, 0);
    }

    function setCurrentLanguage() {
        $scope.currentLanguage = $filter('filter')($scope.languages, {
            language_id: $scope.langId
        })[0];
    }
    // get available tables for the current language
    $scope.getTables = function(id) {
        Data.tables.query({
            lid: id
        }, onTablesSuccess, onDataError);
    }

    function onTablesSuccess(e) {
       $timeout(function() {
            $scope.tables = e;
            $scope.$apply();
            setCurrentTable();
        }, 0);
    }

    function setCurrentTable() {
        $scope.currentTable = $filter('filter')($scope.tables, {
            table_id: $scope.tableId
        })[0];
        if (!$scope.currentTable) {
            $scope.currentTable = $scope.tables[0];
            $scope.tableId = $scope.currentTable.table_id;
            $scope.$apply();
        }
    }
    // get parameters for the current table
    function getTableParams(id) {
        Data.params.query({
            tid: id
        }, onTableParamSuccess, onDataError);
    }

    function onTableParamSuccess(e) {
        $timeout(function() {
            $scope.params = e;
            $scope.$apply();
            $scope.$broadcast('mainDataReady');
        });
    }

    function onDataError(e) {
        $location.path("/error/" + e.status);
        $location.replace();
    }
    $scope.genderChanged = function(value) {
        $scope.gender = value || 'male';
    }
    $scope.eventModeChange = function(){
        $scope.isSilentWay = !$scope.isSilentWay;
    }
    $scope.signIn = function() {
        if ($scope.login == $scope.config.user_config.login && $scope.pass == $scope.config.user_config.pass) {
            $timeout(function() {
                $scope.isAuthenticated = true;
                $scope.$apply();
            }, 0);
        }
    }
    $scope.signOut = function() {
        $scope.login = "";
        $scope.pass = "";
        $scope.isAuthenticated = false;
    }
    $scope.onLanguageChange = function(l) {
        $timeout(function() {
            $scope.langId = $scope.currentLanguage.language_id;
            $scope.$apply();
            $scope.getTables($scope.langId);
        }, 0);
    }
    $scope.onTableChange = function(t) {
        $timeout(function() {
            $scope.tableId = $scope.currentTable.table_id;
            $scope.$apply();
        }, 0);
    }
    $scope.reloadData = function() {
        showPleaseWaitModal();
        $timeout(function() {
            $scope.$broadcast('reloadData', {
                lang: $scope.langId,
                table: $scope.tableId
            });
            getTableParams($scope.tableId);
        });
    }
    $scope.openHelp = function() {
        var modalInstance = $modal.open({
            templateUrl: 'js/app/main/partials/helpModal.html',
            controller: 'HelpModalCtrl',
            scope: $scope
        });
        modalInstance.result.then(function() {
            //on ok button press 
        }, function() {
            //dismiss            
        });
    }
}