'use strict';
/**
 *
 * @param {type} $scope scope
 */
function ConfigCtrl($scope, MainFactory) {
    
    $scope.gender = 'male';

    $scope.init = function() {
        
    };

    angular.element(document).ready(function() {
        $scope.init();       
    });
    
    $scope.genderChanged = function(value){
        $scope.gender = value;
        MainFactory.setGender($scope.gender);
    }

    $scope.modelChanged = function(event){

    }
   
}
