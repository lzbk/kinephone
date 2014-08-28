'use strict';
/**
 *
 * @param {type} $scope scope
 */
function ConfigCtrl($scope, $routeParams, Datas) {
    
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
        Datas.get({language:$scope.langue, method: $scope.methode}, Result);        
    };

    function Result(result){
        $scope.datas = result;
    }

    angular.element(document).ready(function() {
        $scope.init();   
    });
    
   
}
