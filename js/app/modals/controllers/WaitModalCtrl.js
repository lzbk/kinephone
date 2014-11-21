(function () {
    'use strict';
    
    angular.module('Modal').controller('WaitModalCtrl', [
        '$scope', 
        '$modalInstance',
        function ($scope, $modalInstance) {
            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };
        }        
    ]);
})();

