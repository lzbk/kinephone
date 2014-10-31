(function () {
    'use strict';

    angular.module('table').controller('TableCtrl', [
        '$scope',
        '$filter',
        '$location',
        '$timeout',
        'TableDataService',
        'ParamsServices',
        function ($scope, $filter, $location, $timeout, TableDataService, ParamsServices) {
            $scope.tableData = null; // all datas for the current table
            $scope.details = null; // details for the current item selected    
            $scope.sounds = new Array();
            $scope.showDetails = false;

            $scope.init = function () {
                // create an html5 audio object for each sound related to each item
                createAudioElements();                
                $('img[usemap]').rwdImageMaps();
                // propagate event in order to tell main app : pplease close wait modal !
                $scope.$emit('tableDataReady');
            };
            // listen to main controller events
            $scope.$on('mainDataReady', loadTableParams);
            $scope.$on('reloadData', loadTableParams);

            // handle tap event on an item
            $scope.handleAreaTapEvent = function ($event) {
                if (!$scope.isSilentWay) {
                    playVowel($event);
                } else {
                    showItemDetails($event);
                }
            };
            // handle hold event on an item
            $scope.handleAreaHoldEvent = function ($event) {
                if (!$scope.isSilentWay) {
                    showItemDetails($event);
                } else {
                    playVowel($event);
                }
            };

            function loadTableParams() {
                ParamsServices.query({tid: $scope.tableId}, function (e) {
                    $scope.params = e;
                    loadTableData();
                });
            }

            function loadTableData() {
                TableDataService.query({
                    lid: $scope.langId,
                    tid: $scope.tableId
                }, onItemsSuccess, onDataError);
            }

            function onItemsSuccess(e) {
                // have to use this ($apply and $timeout)... or image map will be very strange and not always updated 
                $timeout(function () {
                    $scope.tableData = e;
                    $scope.showDetails = false;
                    $scope.$apply();
                    $scope.init();
                }, 0);
            }

            function onDataError(e) {
                $location.path("/error/" + e.status);
                $location.replace();
            }
            // tap on table rectangle
            function playVowel(e) {
                var id = e.target.id;
                var sound = getSound(parseInt(id), $scope.gender, 'phonem');
                if (sound)
                    sound.play();
            }
            // hold (long prress) on image map area
            function showItemDetails(e) {
                var id = e.target.id;
                $scope.details = getItemDetails(id);
                $scope.showDetails = true;
            }

            $scope.play1 = function () {
                var sound = getSound(parseInt($scope.details.id), $scope.gender, 'phonem');
                if (sound)
                    sound.play();
            };
            $scope.play2 = function () {
                var sound = getSound(parseInt($scope.details.id), $scope.gender, 'word');
                if (sound)
                    sound.play();
            };
            $scope.showHidePanel = function () {
                $scope.showDetails = !$scope.showDetails;
            };

            function getItemDetails(id) {
                var currentDetails = $filter('filter')($scope.tableData.items, {
                    id: id
                })[0];
                return currentDetails;
            }

            function getSound(id, gender, type) {
                var currentSound = $filter('filter')($scope.sounds, {
                    id: id,
                    gender: gender,
                    type: type
                })[0];
                return currentSound.sound;
            }

            function createAudioElements() {
                for (var i in $scope.tableData.items) {
                    var id = parseInt($scope.tableData.items[i].id);
                    for (var j in $scope.tableData.items[i].sounds) {
                        var sound = new Audio($scope.tableData.items[i].sounds[j].url);
                        var data = {
                            'id': id,
                            'type': $scope.tableData.items[i].sounds[j].type,
                            'gender': $scope.tableData.items[i].sounds[j].gender,
                            'sound': sound
                        };
                        $scope.sounds.push(data);
                    }
                }
            }
            
        }
    ]);
})();