'use strict';
/**
 *
 * @param {type} $scope scope
 */
function HomeCtrl($scope, $routeParams, Data) {

    $scope.data = {}; // all datas for the current language and method
    $scope.details = null; // details for the current item selected
    $scope.gender = 'male';
    // url params //
    // method id
    if ($routeParams.method) {
        $scope.method = $routeParams.method;
    } else {        
        $scope.method = null;
    }
    // language id
    if ($routeParams.lang) {
        $scope.lang = $routeParams.lang;
    } else {
        $scope.lang = null;
    }

    $scope.init = function() {       
        $('img[usemap]').rwdImageMaps();
        $scope.toggleConfigPanel();
        // create an html5 audio element object for each item sound
        createAudioElements($scope.gender);
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
            $scope.$apply();
            $scope.init();
        }, 0);
    }

    function error(e) {
        console.log(e);
    }

    $scope.toggleConfigPanel = function(){
        $("#config-bar-wrapper").toggle();
    }

    // tap on table rectangle
    $scope.playVowel = function(e){
        var id = e.target.id;
        angular.element('#phonem-' + id + '-' + $scope.gender ).get(0).play();
    }

    // press (long click) on table rectangle
    $scope.showItemDetails = function(e) {
        alert ('pressed');
        var id = e.target.id;
        // get item details
        $scope.details = getItemDetails(id);
    }

    $scope.play1 = function() {
        // this line make it work on iOS
        angular.element('#phonem-' + $scope.details.id + '-' + $scope.gender ).get(0).load();
        angular.element('#phonem-' + $scope.details.id + '-' + $scope.gender ).get(0).play();
    }

    $scope.play2 = function() {
        // this line make it work on iOS
        angular.element('#word-' + $scope.details.id + '-' + $scope.gender ).get(0).load();
        angular.element('#word-' + $scope.details.id + '-' + $scope.gender ).get(0).play();
    }

    $scope.genderChanged = function(value) {
        $scope.gender = value || 'male';
    }
    
    $scope.modelChanged = function(value) {
        $scope.methode = value || 'gattegno';
    }   

    function getItemDetails(id) {
        for (var index in $scope.data.items) {
            if (id == $scope.data.items[index].id) {
                return $scope.data.items[index];
            }
        }
    }

    /**
    create all audio elements at startup
    this will allow to play all audio with no loading time 
    **/
    function createAudioElements(gender){
        for (var i in $scope.data.items){
            console.log($scope.data.items[i]);
            var id = $scope.data.items[i].id;
            var html = '';
            for (var j in $scope.data.items[i].sounds){
                html += '<audio id="' + $scope.data.items[i].sounds[j].type + '-' + id + '-' + $scope.data.items[i].sounds[j].gender + '"';
                html += ' preload="auto" type="audio/mpeg"';
                html += ' src="' + $scope.data.items[i].sounds[j].url + '">';
                html += '</audio>';
            }
            angular.element('.audio-container').append(html);
        }
    }
}