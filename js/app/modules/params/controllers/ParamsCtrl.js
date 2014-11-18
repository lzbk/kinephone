(function () {
    'use strict';
    angular.module('params').controller('ParamsCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        '$timeout',
        'ParamsServices',
        function ($scope, $location, $routeParams, $timeout, ParamsServices) {
            $scope.error = false;
            $scope.success = false;
            $scope.params = null;

            if (!$scope.isAuthenticated || !$routeParams.table || !$routeParams.lang) {
                redirect();
            } else {                
                loadParams();
            }         

            $scope.update = function (params) {
                $scope.params.$update({
                    tid: $scope.selectedTable.table_id,
                    pid: params.id
                }, onUpdateSuccess, onUpdateError);
            };
            
            $scope.$on('reloadData', loadParams);
            
            function loadParams(){
                ParamsServices.query({
                    tid: $scope.selectedTable.table_id
                }, onParamsSuccess, onParamsError);
            }

            function onParamsSuccess(e) {
                $scope.params = e;
                $scope.waitModalInstance.close();
            }

            function onParamsError(e) {
                $location.path("/error/" + e.status);
                $location.replace();
            }

            function redirect() {
                $location.path($scope.selectedLanguage.language_id + "/" + $scope.selectedTable.table_id + "/table");
                $location.replace();
            }

            function onUpdateSuccess() {
                $scope.success = true;
                $scope.error = false;
                // automaticaly hide success message
                $timeout(function () {
                    $scope.success = false;
                }, 3000);
            }

            function onUpdateError(e) {
                $scope.success = false;
                $scope.error = true;
                // automaticaly hide error message
                $timeout(function () {
                    $scope.error = false;
                }, 3000);
            }
        }
    ]);
})();