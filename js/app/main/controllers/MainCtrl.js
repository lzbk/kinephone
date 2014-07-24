'use strict';

/**
 * 
 * @param {type} $scope scope
 */
function MainCtrl($scope, $location, MainFactory) {

    // connected user
    /*$scope.user =
            {
                'id': '150062f4-2493-4b6c-8a94-7cdea51c248e',
                'name': 'Pitrack',
                'teacher': true
            };*/


    angular.element(document).ready(function() {

    	// set gender with default value
    	/*$scope.gender = 'male';
    	//MainFactory.setGender($scope.gender);

    	// gender config dropdown event
    	$("#gender-dropdown li a").click(function(){
    		//console.log($(this).text().toLowerCase());
    		//MainFactory.setGender($(this).text().toLowerCase());
    		$scope.gender = $(this).text().toLowerCase();
		});

		$scope.model = 'gattegno';
		// gender config dropdown event
    	$("#model-dropdown li a").click(function(){
    		//console.log($(this).text().toLowerCase());
    		//MainFactory.setGender($(this).text().toLowerCase());
    		$scope.model = $(this).text().toLowerCase();
		});
        */
    });
   
}