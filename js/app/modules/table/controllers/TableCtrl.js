'use strict';
/**
 *
 * @param {type} $scope scope
 */
function TableCtrl($scope, $location, $timeout, Data) {

    $scope.data = {}; // all datas for the current language and table
    $scope.details = null; // details for the current item selected    
    $scope.sounds = new Array();
    $scope.showDetails = false;

    var hammer = null;

    $scope.init = function() {    
        $('img[usemap]').rwdImageMaps();
        // create an html5 audio object for each sound related to each item
        createAudioElements($scope.gender);
    };

    // listen to main controller events
    $scope.$on('dataReady', loadData); 
    $scope.$on('reloadData', loadData);

    $scope.handleTap = function($event){
        if(!$scope.isSilentWay){
            playVowel($event);                
        }
        else{               
            showItemDetails($event);
        }
    }

     $scope.handleHold = function($event){
        if(!$scope.isSilentWay){
            showItemDetails($event);                
        }
        else{               
            playVowel($event);
        }
    }

    function loadData(){
        Data.items.query({
            lid: $scope.langId,
            tid: $scope.tableId
        }, onItemsSuccess, onDataError);
    }

    function onItemsSuccess(e) {
        $timeout(function() {
            $scope.data = e;
            $scope.$apply();
            $scope.init();
            $scope.showDetails = false; 
        }, 0);
    }

    function onDataError(e) {
        $location.path("/error/" + e.status);
        $location.replace();
    }

    // tap on table rectangle
    function playVowel (e){
        var id = e.target.id;
        var sound = getSound(parseInt(id), $scope.gender, 'phonem');
        if(sound) sound.play();
    }

    // press (long click) on table rectangle
    function showItemDetails (e) {
        //e.preventDefault();
        var id = e.target.id;
        // get item details
        $timeout(function() {   
            $scope.details = getItemDetails(id);            
            $scope.$apply();
        }, 0);

        $timeout(function(){
            $scope.showDetails = true;
            $scope.$apply();
        },20);
    }

    $scope.play1 = function() {
        var sound = getSound(parseInt($scope.details.id), $scope.gender, 'phonem');
        console.log(sound);
        if(sound) sound.play();
    }

    $scope.play2 = function() {
        var sound = getSound(parseInt($scope.details.id), $scope.gender, 'word');
        if(sound) sound.play();
    }  

    $scope.showHidePanel = function(){
        $scope.showDetails = !$scope.showDetails;
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