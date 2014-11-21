(function () {
    'use strict';

    angular.module('Modal').controller('HelpModalCtrl', [
        '$scope',
        '$modalInstance',
        function ($scope, $modalInstance) {
            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);



})();
