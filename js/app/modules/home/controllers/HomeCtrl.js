'use strict';
/**
 *
 * @param {type} $scope scope
 */
function HomeCtrl($scope, $http, $interval, $routeParams, Datas) {
    $scope.title = 'Home';
    $scope.panelVisible = false;
    $scope.currentId = 0; // keep the id of the current selected detail in order to manage right panel opening / closing
    $scope.datas = {}; // all datas for the current language and method
    $scope.details = {}; // details for the current item selected
    // url params //
    // methode
    if (!$routeParams.methode) {
        $scope.methode = 'gattegno';
    } else {
        $scope.methode = $routeParams.methode;
    }
    // language
    if ($routeParams.langue) {
        $scope.langue = 'uk';
    } else {
        $scope.langue = $routeParams.langue;
    }
    // gender
    if (!$routeParams.gender) {
        $scope.gender = 'male';
    } else {
        $scope.gender = $routeParams.gender;
    }
    $scope.init = function() {
        $('img[usemap]').rwdImageMaps();
        $('#right-panel').hide();
    };
    angular.element(document).ready(function() {
        //$scope.init(); 
        Datas.get({
            language: $scope.langue,
            method: $scope.methode
        }, Result);
    });

    function Result(datas) {
        window.setTimeout(function() {
            $scope.datas = datas;
            $scope.$apply();
            $scope.init();
        }, 0);
    }
    $scope.toggleRightPanel = function() {
        //e.preventDefault();

        $("#wrapper").toggleClass("toggled");
        // redraw image maps after transition made by css
        window.setTimeout(function() {
            updateImageMap();
            $scope.panelVisible = !$scope.panelVisible;
        }, 400);
    }
    $scope.showDetails = function(e) {
        var id = e.target.id;
        // load details
        $scope.details = getDetails(id);
        // no items have been selected or the item previously clicked is the same
        if ($scope.currentId == 0 || $scope.currentId == id || ($scope.currentId != id && !$scope.panelVisible)) {
            $scope.toggleRightPanel();
        }
        $scope.currentId = id;
    }
    $scope.play1 = function() {
        // this line make it work on iOS
        $('#player1').get(0).load();
        $('#player1').get(0).play();
    }
    $scope.play2 = function() {
        // this line make it work on iOS
        $('#player2').get(0).load();
        $('#player2').get(0).play();
    }
    $scope.genderChanged = function(value) {
        $scope.gender = value || 'male';
    }
    $scope.modelChanged = function(value) {
        $scope.methode = value || 'gattegno';
    }

    function getDetails(id) {
        for (var index in $scope.datas.items) {
            if (id == $scope.datas.items[index].id) {
                return $scope.datas.items[index];
            }
        }
    }

    function updateImageMap() {
        var $img = $('#big-image');
        $img.each(function() {
            if (typeof($(this).attr('usemap')) == 'undefined') return;
            var that = this,
                $that = $(that);
            // Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
            $('<img />').load(function() {
                var attrW = 'width',
                    attrH = 'height',
                    w = $that.attr(attrW),
                    h = $that.attr(attrH);
                if (!w || !h) {
                    var temp = new Image();
                    temp.src = $that.attr('src');
                    if (!w) w = temp.width;
                    if (!h) h = temp.height;
                }
                var wPercent = $that.width() / 100,
                    hPercent = $that.height() / 100,
                    map = $that.attr('usemap').replace('#', ''),
                    c = 'coords';
                $('map[name="' + map + '"]').find('area').each(function() {
                    var $this = $(this);
                    if (!$this.data(c)) $this.data(c, $this.attr(c));
                    var coords = $this.data(c).split(','),
                        coordsPercent = new Array(coords.length);
                    for (var i = 0; i < coordsPercent.length; ++i) {
                        if (i % 2 === 0) coordsPercent[i] = parseInt(((coords[i] / w) * 100) * wPercent);
                        else coordsPercent[i] = parseInt(((coords[i] / h) * 100) * hPercent);
                    }
                    $this.attr(c, coordsPercent.toString());
                });
            }).attr('src', $that.attr('src'));
        });
    }
}