'use strict';
/**
 *
 * @param {type} $scope scope
 */
function ParamsCtrl($scope, $location, $timeout, Data) {
    $scope.error = false;
    $scope.success = false;
    $scope.$on('dataReady', mainReadyEvent);

    function mainReadyEvent() {
        // check if user is authenticated
        if (!$scope.isAuthenticated) {
            redirect();
        }
    }

    function redirect() {
        $location.path($scope.langId + "/" + $scope.tableId + "/table");
        $location.replace();
    }
    $scope.update = function(params) {
        $scope.params.$update({
            tid: $scope.tableId,
            pid: params.id
        }, onUpdateSuccess, onUpdateError);
    }

    function onUpdateSuccess() {
        $timeout(function() {
            $scope.success = true;
            $scope.error = false;
            $scope.$apply();
        }, 0);
        $timeout(function() {
            $scope.success = false;
            $scope.$apply();
        }, 3000);
    }

    function onUpdateError() {
        $timeout(function() {
            $scope.success = false;
            $scope.error = true;
            $scope.$apply();
        }, 0);
        
        $timeout(function() {
            $scope.error = false;
            $scope.$apply();
        }, 3000);
    }
}