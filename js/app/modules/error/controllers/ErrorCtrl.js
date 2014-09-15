'use strict';
/**
 *
 * @param {type} $scope scope
 */
function ErrorCtrl($scope, $routeParams) {
	$scope.message = 'An error occured while retrieving data.';
	
    // url params //
    // error code
    if ($routeParams.errorCode) {
        $scope.eCode = $routeParams.errorCode;
    }
    else{
    	$scope.eCode = 'Unknown'; 
    }
}