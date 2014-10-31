(function () {
    'use strict';

    angular.module('common').controller('HelpModalCtrl', [
        '$scope',
        '$modalInstance',
        function ($scope, $modalInstance) {
            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);



})();
