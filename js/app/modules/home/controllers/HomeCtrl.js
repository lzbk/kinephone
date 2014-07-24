'use strict';
/**
 *
 * @param {type} $scope scope
 */
function HomeCtrl($scope, $modal, $filter, UtilsFactory, MainFactory) {
    $scope.title = 'Home';
    $scope.panelVisible = false;
    $scope.currentId = 0;
    $scope.details = [];
    $scope.bigImageUrl = '';
    $scope.bigImageMap = []; 
    $scope.item = {}; // current item

    $scope.gender = 'male';
    $scope.model = 'gattegno';


    $scope.init = function() {
        $('img[usemap]').rwdImageMaps();
        $('#right-panel').hide();
        $('#config-panel').hide();
        // todo get position width and height to be able to draw a interactive layer
        console.log($('img[usemap]').position());
        var top = $('img[usemap]').position().top;
        var left = $('img[usemap]').position().left;
        for(var index in $scope.bigImageMap){
            // split values 0 -> 3

            // calculate top, left, width, height

            // draw html item with right values

            // events on item
        }
        // what if the window is resized ?
    };

    angular.element(document).ready(function() {
        // get all datas for the current "language table" and symbologic type (Gattegno Vs Dan Vs ...)
        getAllDatas('uk', $scope.model); 
        $scope.init();    
    });
    
    $scope.toggleRightPanel = function() {
        $('#right-panel').toggle('slide', {
            direction: 'right'
        }, 1000, function() {
            $scope.panelVisible = !$scope.panelVisible;
        });
    }

    $scope.showDetails = function(e) {        
        var id = e.target.id;
        // load details datas
        $scope.item = getDetail(id);
        // no items have been selected or the item previously clicked is the same
        if ($scope.currentId == 0 || $scope.currentId == id || ($scope.currentId != id && !$scope.panelVisible)) {
            $scope.toggleRightPanel();
        }
        $scope.currentId = id;
    }

    $scope.play1 = function(){
        $('#player1').get(0).play();
    }

    $scope.play2 = function(){
        $('#player2').get(0).play();
    }

    $scope.genderChanged = function(value){
        $scope.gender = value || 'male';
    }

    $scope.modelChanged = function(value){
        $scope.model = value || 'gattegno';
    }

    // get datas for a given language and model
    function getAllDatas(language, model) {

        if (language == 'uk' && model == 'gattegno') {
            //$('map').empty();
            $scope.bigImageUrl = 'medias/uk/gattegno-img-1.png';

            // get map data associated with the big gattugno image
            $scope.bigImageMap = [];
            $scope.bigImageMap.push('59,28,125,57'); 
            $scope.bigImageMap.push('150,28,216,55');
            $scope.bigImageMap.push('242,27,306,55'); 
            $scope.bigImageMap.push('371,25,435,54'); 
            $scope.bigImageMap.push('451,28,514,54'); 
            $scope.bigImageMap.push('529,28,592,54'); 
            $scope.bigImageMap.push('652,29,717,55'); 
            $scope.bigImageMap.push('60,61,125,87'); 
            $scope.bigImageMap.push('26,116,91,142'); 
            $scope.bigImageMap.push('104,116,169,144'); 
            $scope.bigImageMap.push('237,114,303,142'); 
            $scope.bigImageMap.push('318,117,381,143'); 
            $scope.bigImageMap.push('449,115,514,144'); 
            $scope.bigImageMap.push('530,116,591,142'); 
            $scope.bigImageMap.push('607,115,672,143'); 
            $scope.bigImageMap.push('685,116,747,142'); 
            $scope.bigImageMap.push('183,169,248,199'); 
            $scope.bigImageMap.push('355,172,418,197'); 
            $scope.bigImageMap.push('528,170,593,198'); 
            $scope.bigImageMap.push('353,207,421,232'); 
            $scope.bigImageMap.push('25,301,91,331'); 
            $scope.bigImageMap.push('109,302,173,329'); 
            $scope.bigImageMap.push('193,302,256,330'); 
            $scope.bigImageMap.push('273,301,338,328'); 
            $scope.bigImageMap.push('356,302,420,327'); 
            $scope.bigImageMap.push('439,303,501,328'); 
            $scope.bigImageMap.push('521,303,584,329'); 
            $scope.bigImageMap.push('602,303,666,326'); 
            $scope.bigImageMap.push('684,301,749,328'); 
            $scope.bigImageMap.push('60,360,123,389'); 
            $scope.bigImageMap.push('144,362,210,387'); 
            $scope.bigImageMap.push('230,361,292,389'); 
            $scope.bigImageMap.push('314,362,378,386'); 
            $scope.bigImageMap.push('398,361,461,388'); 
            $scope.bigImageMap.push('481,360,547,389'); 
            $scope.bigImageMap.push('567,360,631,388'); 
            $scope.bigImageMap.push('651,362,714,389'); 
            $scope.bigImageMap.push('192,421,253,445'); 
            $scope.bigImageMap.push('356,419,419,447'); 
            $scope.bigImageMap.push('521,418,585,447'); 
            $scope.bigImageMap.push('229,475,291,504'); 
            $scope.bigImageMap.push('313,479,378,507'); 
            $scope.bigImageMap.push('397,477,463,504');
            $scope.bigImageMap.push('482,479,549,507');

            //console.log($scope.bigImageMap);

            var detail = {};

            detail = {
                'id': 1,
                'symbol': 'medias/uk/vowels/1_dog/symbol.png',
                'image': 'medias/uk/vowels/1_dog/dog.jpg',
                'soundShortMale': 'medias/uk/vowels/1_dog/Open_back_rounded_vowel_male.mp3',
                'soundShortFemale': 'medias/uk/vowels/1_dog/Open_back_rounded_vowel_female.mp3',
                'soundLongMale': 'medias/uk/vowels/1_dog/dog_male.mp3',
                'soundLongFemale': 'medias/uk/vowels/1_dog/dog_female.mp3',
                'descriptionShort': 'This is the short description of this wovel',
                'descriptionLong': 'This is the long description of this wovel'
            }
            $scope.details.push(detail);
            detail = {};
            detail = {
                'id': 2,
                'symbol': 'medias/uk/vowels/2_cat/symbol.png',
                'image': 'medias/uk/vowels/2_cat/cat.jpg',
                'soundShortMale': 'medias/uk/vowels/2_cat/Near-open_front_unrounded_vowel_male.mp3',
                'soundShortFemale': 'medias/uk/vowels/2_cat/Near-open_front_unrounded_vowel_female.mp3',
                'soundLongMale': 'medias/uk/vowels/2_cat/cat_male.mp3',
                'soundLongFemale': 'medias/uk/vowels/2_cat/cat_female.mp3',
                'descriptionShort': 'Short description',
                'descriptionLong': 'Long description'
            }
            $scope.details.push(detail);
            detail = {};
            detail = {
                'id': 3,
                'symbol': 'medias/uk/vowels/3_bed/symbol.png',
                'image': 'medias/uk/vowels/3_bed/bed.jpeg',
                'soundShortMale': 'medias/uk/vowels/3_bed/Open-mid_front_unrounded_vowel_male.mp3',
                'soundShortFemale': 'medias/uk/vowels/3_bed/Open-mid_front_unrounded_vowel_female.mp3',
                'soundLongMale': 'medias/uk/vowels/3_bed/bed_male.mp3',
                'soundLongFemale': 'medias/uk/vowels/3_bed/bed_female.mp3',
                'descriptionShort': 'Short description',
                'descriptionLong': 'Long description'
            }
            $scope.details.push(detail);
        }
    }

    function getDetail(id) {
        for (var index in $scope.details) {
            if (id == $scope.details[index].id) {
                return $scope.details[index];
            }
        }
    }
}