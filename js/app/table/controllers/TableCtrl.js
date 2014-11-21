(function () {
    'use strict';

    angular.module('Table').controller('TableCtrl', [
        '$scope',
        'TableService',
        'tableData',
        'tableParams',
        'TranslationService',
        'HeaderService',
        function ($scope, TableService, tableData, tableParams, TranslationService, HeaderService) {

            $scope.tableData = tableData; // all datas for the current table
            $scope.params = tableParams;
            // get translation
            TranslationService.getTranslation($scope, 'fr');

            $scope.details = null; // details for the current item selected    
            $scope.showDetails = false;

            angular.element(document).ready(function () {
                window.setTimeout(function(){                    
                    $('img[usemap]').rwdImageMaps();
                }, 200);
            });
            
            // handle tap event on an item
            $scope.handleAreaTapEvent = function ($event) {
                if (!HeaderService.getIsSilentWay()/*$scope.isSilentWay*/) {
                    playVowel($event);
                } else {
                    showItemDetails($event);
                }
            };
            // handle hold event on an item
            $scope.handleAreaHoldEvent = function ($event) {
                if (!HeaderService.getIsSilentWay()) {
                    showItemDetails($event);
                } else {
                    playVowel($event);
                }
            };

            // tap on table rectangle
            function playVowel(e) {
                var id = parseInt(e.target.id);
                var item = TableService.getItemDetails($scope.tableData.items, parseInt(id)); //id - 1;
                var soundData = TableService.getSound(item.sounds, HeaderService.getGender(), 'phonem');
                var sound = new Audio(soundData.url);
                if (sound)
                    sound.play();
            }
            // hold (long prress) on image map area
            function showItemDetails(e) {
                var id = parseInt(e.target.id);
                $scope.details = TableService.getItemDetails($scope.tableData.items, id);
                $scope.showDetails = true;
            }

            // play sound from detail panel
            $scope.play = function (type) {
                var item = TableService.getItemDetails($scope.tableData.items, parseInt($scope.details.id));
                var soundData = TableService.getSound(item.sounds, HeaderService.getGender(), type);
                var sound = new Audio(soundData.url);
                if (sound)
                    sound.play();
            };

            $scope.toggleDetailPanel = function () {
                $scope.showDetails = !$scope.showDetails;
            };
        }
    ]);
})();
