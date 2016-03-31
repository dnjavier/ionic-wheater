(function(){
  'use strict';

  angular
    .module('starter')
    .controller('SettingsController', SettingsController);

  function SettingsController(conection){
    var settings = this;
    settings.unitColor = true;

    settings.location = conection.settings.location;
    settings.autoDefine = conection.settings.autoDefine;
    settings.notification = conection.settings.notification;
    settings.unit = conection.settings.unit;
    settings.time = conection.settings.time;

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;
      console.log('Lat: '+crd.latitude);
      console.log('Lat: '+crd.longitude);
      console.log('Lat: '+crd.accuracy+ ' meters.');
    };

    function error(err) {
      alert('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);


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
