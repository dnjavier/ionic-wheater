(function(){
  'use strict';

  angular
    .module('starter')
    .controller('SettingsController', SettingsController);

  function SettingsController(conection, $cordovaGeolocation, $state){
    var settings = this;

    settings.config = conection.settings;

    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    settings.getLocation = function(){
      settings.spinner = true;
      settings.config.location = '';
      $cordovaGeolocation
        .getCurrentPosition(options)
        .then(function (position) {
          settings.spinner = false;
          settings.config.lat = position.coords.latitude;
          settings.config.lon = position.coords.longitude;
          var acur = position.coords.accuracy;
          conection.setSettings(settings);
          settings.config.location = 'current location';
        }, function(err) {
          // error
        });
    }

    settings.temp = function(unit) {
      if(unit == 'c') {
        settings.config.unit = 'metric';
        settings.config.unitColor = true;
      }

      if(unit == 'f') {
        settings.config.unit = 'imperial';
        settings.config.unitColor = false;
      }
      console.log(settings.config.unitColor);
    }

    settings.setValues = function(){
      if (settings.notification) {
        conection.notification(settings.config.location, settings.time, settings.config.lat, settings.config.lon);
      }
      conection.setSettings(settings);
      $state.go('main');
    }
  }

})();
