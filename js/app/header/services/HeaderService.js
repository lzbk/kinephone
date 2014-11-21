(function () {

    'use strict';

    angular.module('Header').factory('HeaderService', [
        'ConfigService',
        function (ConfigService) {



            var isAuthenticated = false; // is user authenticated ?
            var gender = 'male'; // default gender
            var isSilentWay = false; // silent way means that when you tap on an item you won't here the sound but see details


            return{
                setIsAuthenticated: function (hasCredential) {
                    isAuthenticated = hasCredential;
                    return isAuthenticated;
                },
                getIsAuthenticated: function () {
                    return isAuthenticated;
                },
                setGender: function (currentGender) {
                    gender = currentGender;
                },
                getGender: function () {
                    return gender;
                },
                setIsSilentWay: function (silentWay) {
                    isSilentWay = silentWay;
                },
                getIsSilentWay: function(){
                    return isSilentWay;
                }
            };
        }]);


})();
