/**
 * Header Directive
 */
(function () {
    'use strict';
    angular.module('Header').directive('uiHeader', [ 
        function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                },
                templateUrl: 'js/app/header/partials/header.html',
                controller: 'HeaderCtrl',
                controllerAs: 'header',
                link: function (scope, element, attrs, header) {

                }
            };
        }
    ]);
})();
