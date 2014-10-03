'use strict';
/**
 *
 * @param {type} $scope scope
 */
function TableCtrl($scope, $location, Data) {

    $scope.data = {}; // all datas for the current language and table
    $scope.details = null; // details for the current item selected    
    $scope.sounds = new Array();

    $scope.init = function() {    
        $('img[usemap]').rwdImageMaps();
        // create an html5 audio object for each sound related to each item
        createAudioElements($scope.gender);
    };

    // listen to main controller ready event
    $scope.$on('dataReady', loadData);

   

    $scope.$on('reloadData', loadData)

    function loadData(){
        Data.items.query({
            lid: $scope.langId,
            tid: $scope.tableId
        }, onItemsSuccess, onDataError);
    }

    function onItemsSuccess(e) {
        window.setTimeout(function() {
            $scope.data = e;
            $scope.$apply();
            $scope.init();       
        }, 0);
    }

    function onDataError(e) {
        $location.path("/error/" + e.status);
        $location.replace();
    }

    // tap on table rectangle
    $scope.playVowel = function(e){
        var id = e.target.id;
        var sound = getSound(parseInt(id), $scope.gender, 'phonem');
        if(sound) sound.play();
    }

    // press (long click) on table rectangle
    $scope.showItemDetails = function($e) {
        $e.preventDefault();
        var id = $e.target.id;
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