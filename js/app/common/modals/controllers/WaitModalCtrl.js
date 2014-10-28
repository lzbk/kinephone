'use strict';

function WaitModalCtrl($scope, $modalInstance) {

    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };
}