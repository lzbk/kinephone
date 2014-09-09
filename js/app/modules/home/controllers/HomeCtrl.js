'use strict';
/**
 *
 * @param {type} $scope scope
 */
function HomeCtrl($scope, $routeParams, Data) {

    $scope.data = {}; // all datas for the current language and method
    $scope.details = null; // details for the current item selected
    $scope.gender = 'male';
    $scope.sounds = new Array();

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
        // create an html5 audio object for each item sound
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
        angular.element("#config-bar-wrapper").toggle('slide', { direction: 'down' }); 
    }

    // tap on table rectangle
    $scope.playVowel = function(e){
        var id = e.target.id;
        var sound = getSound(parseInt(id), $scope.gender, 'phonem');
        if(sound) sound.play();
    }

    // press (long click) on table rectangle
    $scope.showItemDetails = function(e) {
        var id = e.target.id;
        // get item details
        $scope.details = getItemDetails(id);
    }

    $scope.play1 = function() {
        var sound = getSound(parseInt($scope.details.id), $scope.gender, 'phonem');
        if(sound) sound.play();
    }

    $scope.play2 = function() {
        var sound = getSound(parseInt($scope.details.id), $scope.gender, 'word');
        if(sound) sound.play();
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

    function getSound(id, gender, type){
        for(var i in $scope.sounds){
            if($scope.sounds[i].gender === gender && $scope.sounds[i].id === id && $scope.sounds[i].type === type){
                return $scope.sounds[i].sound;
            }
        }
    }

    function createAudioElements(gender){
        for (var i in $scope.data.items){
            var id = parseInt($scope.data.items[i].id);
            for (var j in $scope.data.items[i].sounds){
                var sound = new Audio($scope.data.items[i].sounds[j].url);
                var data = {'id' : id, 'type': $scope.data.items[i].sounds[j].type, 'gender' : $scope.data.items[i].sounds[j].gender, 'sound' : sound};
                $scope.sounds.push(data);
            }
        }
    }
}