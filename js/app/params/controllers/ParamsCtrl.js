(function () {
    'use strict';
    angular.module('Params').controller('ParamsCtrl', [
        '$scope',
        '$location',
        '$timeout',
        'HeaderService',
        'ParamsService',
        'params',
        'LanguageService',
        'TableService',
        function ($scope, $location, $timeout, HeaderService, ParamsService, params, LanguageService, TableService) {
            $scope.error = false;
            $scope.success = false;
            $scope.params = params;
            $scope.langId = LanguageService.getCurrentLanguageId();

          

            if (!HeaderService.getIsAuthenticated()) {
                redirect();
            }

            $scope.update = function (params) {
                var pPromise = ParamsService.updateParams(TableService.getCurrentTableId(), params.id, params);
                pPromise.then(function (data) {
                    // error
                    if (data === 'Error' || data === '') { 
                        $scope.success = false;
                        $scope.error = true;
                        // automaticaly hide error message
                        $timeout(function () {
                            $scope.error = false;
                        }, 3000);
                    }
                    // success
                    else {
                        $scope.success = true;
                        $scope.error = false;
                        // automaticaly hide success message
                        $timeout(function () {
                            $scope.success = false;
                        }, 3000);
                    }
                });
            };

            function redirect() {
                $location.path(LanguageService.getCurrentLanguageId() + "/" + TableService.getCurrentTableId() + "/table");
                $location.replace();
            }
        }
    ]);
})();
