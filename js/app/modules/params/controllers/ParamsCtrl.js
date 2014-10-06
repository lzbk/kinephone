'use strict';
/**
 *
 * @param {type} $scope scope
 */
function ParamsCtrl($scope, $location, Data) {

    $scope.$on('dataReady', mainReadyEvent);
    function mainReadyEvent() {
        // check if user is authenticated
        if(!$scope.isAuthenticated){
            redirect();
        }
    }
    function redirect() {
        $location.path( $scope.langId + "/" + $scope.tableId + "/table");
        $location.replace();
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