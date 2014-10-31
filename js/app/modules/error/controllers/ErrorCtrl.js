(function () {

    'use strict';

    angular.module('error').controller('ErrorCtrl',[
        '$scope', 
        '$routeParams',        
        function ($scope, $routeParams) {
            $scope.message = 'An error occured while retrieving data.';
            if ($routeParams.errorCode) {
                $scope.eCode = $routeParams.errorCode;
            }
            else{
                $scope.eCode = 'Unknown'; 
            }
        }
    ]);
})();