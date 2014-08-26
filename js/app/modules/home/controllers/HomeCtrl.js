'use strict';
/**
 *
 * @param {type} $scope scope
 */
function HomeCtrl($scope, $http, $routeParams, MainFactory) {
    $scope.title = 'Home';
    $scope.panelVisible = false;
    $scope.currentId = 0; // keep the id of the current selected detail in order to manage right panel opening / closing
    $scope.datas = {}; // all datas for the current language and method
    $scope.details = {}; // details for the current item selected

    
    // url params //
    // methode
    if(!$routeParams.methode){
        $scope.methode = 'gattegno';
    }
    else{
        $scope.methode = $routeParams.methode;
    }
    // language
    if($routeParams.langue){
        $scope.langue = 'uk';
    }
    else{
        $scope.langue = $routeParams.langue;
    }
    // gender
    if(!$routeParams.gender){
        $scope.gender = 'male';
    }
    else{
        $scope.gender = $routeParams.gender;
    }

    $scope.init = function() {        
        $('img[usemap]').rwdImageMaps();  
        $('#right-panel').hide();

        /*     
        // todo get position width and height to be able to draw an interactive layer
        var top = $('img[usemap]').position().top;
        var left = $('img[usemap]').position().left;
        */
    };

    angular.element(document).ready(function() {
        // get all datas for the current "language table" and symbologic type (Gattegno Vs Dan Vs ...)
        var url = 'elements/' + $scope.langue + '/' + $scope.methode + '/datas.json';
        $http.get(url).success(function(datas) {
          $scope.datas = datas;
          $scope.init(); 
        });           
    });
    
    $scope.toggleRightPanel = function() {
        $('#right-panel').toggle('slide', {
            direction: 'right'
        }, 1000, function() {
            $scope.panelVisible = !$scope.panelVisible;
        });
    }

    $scope.showDetails = function(e) {        
        var id = e.target.id;
        // load details
        $scope.details = getDetails(id);
        // no items have been selected or the item previously clicked is the same
        if ($scope.currentId == 0 || $scope.currentId == id || ($scope.currentId != id && !$scope.panelVisible)) {
            $scope.toggleRightPanel();
        }
        $scope.currentId = id;
    }

    $scope.play1 = function(){       
        // this line make it work on iOS
        $('#player1').get(0).load();
        $('#player1').get(0).play();
    }

    $scope.play2 = function(){
        // this line make it work on iOS
        $('#player2').get(0).load();
        $('#player2').get(0).play();
    }

    $scope.genderChanged = function(value){
        $scope.gender = value || 'male';
    }

    $scope.modelChanged = function(value){
        $scope.methode = value || 'gattegno';
    }

    function getDetails(id) {
        for (var index in $scope.datas.items) {
            if (id == $scope.datas.items[index].id) {                
                return $scope.datas.items[index];
            }
        }
    }
}