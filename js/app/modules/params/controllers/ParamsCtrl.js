'use strict';
/**
 *
 * @param {type} $scope scope
 */
function ParamsCtrl($scope, $location, Data) {

    $scope.$on('dataReady', mainReadyEvent);
    function mainReadyEvent() {
        //console.log($scope.params);
    }
    $scope.update = function(params) {
        $scope.params.$update({
            tid: $scope.tableId,
            pid: params.id
        }, onUpdateSuccess, onUpdateError);
    }

    function onUpdateSuccess(data) {
        console.log('param update success');
    }

    function onUpdateError(data) {
        $location.path("/error/" + e.status);
        $location.replace();
    }
}