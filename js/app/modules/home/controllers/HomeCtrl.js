'use strict';
/**
 *
 * @param {type} $scope scope
 */
function HomeCtrl($scope, $http, $interval, $routeParams, Data) {

    $scope.panelVisible = false;
    $scope.currentId = 0; // keep the id of the current selected detail in order to manage right panel opening / closing
    $scope.data = {}; // all datas for the current language and method
    $scope.details = {}; // details for the current item selected
    $scope.gender = 'male';
    // url params //
    // method
    if ($routeParams.method) {
        $scope.method = $routeParams.method;
    } else {        
        $scope.method = 1;
    }
    // language
    if ($routeParams.lang) {
        $scope.lang = $routeParams.lang;
    } else {
        $scope.lang = 1;
    }

    $scope.init = function() {
        $('img[usemap]').rwdImageMaps();
        $('#right-panel').hide();
    };
    angular.element(document).ready(function() {
        // get datas
        Data.query({
            langId: $scope.lang,
            method: $scope.method
        }, success, error);
    });

    function success(e) {
        window.setTimeout(function() {
            $scope.data = e;
            console.log($scope.data);
            $scope.$apply();
            $scope.init();
        }, 0);
    }

    function error(e) {
        console.log(e);
    }
    $scope.toggleRightPanel = function() {
        $("#wrapper").toggleClass("toggled");
        $scope.panelVisible = !$scope.panelVisible;
    }
    $scope.showDetails = function(e) {
        var id = e.target.id;
        // load details
        $scope.details = getDetails(id);
        // no items have been selected or the item previously selected is the same
        if ($scope.currentId == 0 || $scope.currentId == id || ($scope.currentId != id && !$scope.panelVisible)) {
            $scope.toggleRightPanel();
        }
        $scope.currentId = id;
    }
    $scope.play1 = function() {
        // this line make it work on iOS
        $('#player1').get(0).load();
        $('#player1').get(0).play();
    }
    $scope.play2 = function() {
        // this line make it work on iOS
        $('#player2').get(0).load();
        $('#player2').get(0).play();
    }
    $scope.genderChanged = function(value) {
        $scope.gender = value || 'male';
    }
    $scope.modelChanged = function(value) {
        $scope.methode = value || 'gattegno';
    }

    function getDetails(id) {
        for (var index in $scope.data.items) {
            if (id == $scope.data.items[index].id) {
                return $scope.data.items[index];
            }
        }
    }
}