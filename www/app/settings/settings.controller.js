(function(){
  'use strict';

  angular
    .module('starter')
    .controller('SettingsController', SettingsController);

  function SettingsController(conection, $cordovaGeolocation, $scope, $rootScope, $ionicPlatform, $cordovaLocalNotification){
    var settings = this;
    settings.unitColor = true;

    settings.location = conection.settings.location;
    settings.autoDefine = conection.settings.autoDefine;
    settings.notification = conection.settings.notification;
    settings.unit = conection.settings.unit;
    settings.time = conection.settings.time;

      $scope.scheduleEveryMinuteNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        every: 'minute'
      }).then(function (result) {
        console.log('22222');
      });
    };

     $scope.scheduleDelayedNotification = function () {
      var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);
      
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        at: _10SecondsFromNow
      }).then(function (result) {
        console.log('22222');
      });
    };

    $rootScope.$on('$cordovaLocalNotification:schedule',
    function (event, notification, state) {
      console.log('hola');
    });

    $rootScope.$on('$cordovaLocalNotification:trigger',
    function (event, notification, state) {
      console.log('hola');
    });

  



    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    settings.getLocation = function(){
      $cordovaGeolocation
        .getCurrentPosition(options)
        .then(function (position) {
          settings.location ='current location';
          settings.lat  = position.coords.latitude;
          settings.lon = position.coords.longitude;
          var acur = position.coords.accuracy;

          settings.setValues();
        }, function(err) {
          // error
        });
    }


    settings.temp = function(unit) {
      if(unit == 'c') {
        settings.unit = 'metric';
        settings.unitColor = true;
      }

      if(unit == 'f') {
        settings.unit = 'imperial';
        settings.unitColor = false;
      }
      console.log(settings.unitColor);
    }

    settings.setValues = function(){
      conection.setSettings(settings.location, settings.autoDefine, settings.notification, settings.time, settings.unit,settings.lat,settings.lon);
    }


  }

})();
