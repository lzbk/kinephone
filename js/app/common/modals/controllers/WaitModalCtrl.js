(function () {
    'use strict';
    
    angular.module('common').controller('WaitModalCtrl', [
        '$scope', 
        '$modalInstance',
        function ($scope, $modalInstance) {
            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };
        }        
    ]);
})();

