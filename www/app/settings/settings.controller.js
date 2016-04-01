(function(){
  'use strict';

  angular
    .module('starter')
    .controller('SettingsController', SettingsController);

  function SettingsController(conection, $cordovaGeolocation, $cordovaLocalNotification){
    var settings = this;

    settings.unitColor = true;
    settings.location = conection.settings.location;
    settings.autoDefine = conection.settings.autoDefine;
    settings.notification = conection.settings.notification;
    settings.unit = conection.settings.unit;
    settings.time = conection.settings.time;

    settings.setNotification = function() {
      var alarmTime = new Date();
      alarmTime.setMinutes(alarmTime.getMinutes() + 1);

      $cordovaLocalNotification.add({
          id: "12345",
          date: alarmTime,
          message: "This is a message",
          title: "This is a title"
      }).then(function () {
          console.log("The notification has been set");
      });
    };

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
