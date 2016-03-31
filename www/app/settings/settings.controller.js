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

    $ionicPlatform.ready(function(){

      cordova.plugins.notification.local.schedule({
        id: 1,
        text: "Single Notification",
        sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
        data: { secret:key }
      });

    });

    $rootScope.$on('$cordovaLocalNotification:trigger',
      function (event, notification, state) {
        console.log('event triggered');
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
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
          var acur = position.coords.accuracy;
          alert('lat: '+lat+
              '\n long: '+long+
              '\n acur: '+acur);
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
      conection.setSettings(settings.location, settings.autoDefine, settings.notification, settings.time, settings.unit);
    }


  }

})();
