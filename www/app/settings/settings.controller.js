(function(){
  'use strict';

  angular
    .module('starter')
    .controller('SettingsController', SettingsController);

  function SettingsController(conection){
    var settings = this;

    settings.location = conection.settings.location;
    settings.autoDefine = conection.settings.autoDefine;
    settings.notification = conection.settings.notification;
    settings.unit = conection.settings.unit;
    settings.time = conection.settings.time;


    settings.temp = function(unit) {
      if(unit == 'c') {
        settings.unit = 'metric';
      }

      if(unit == 'f') {
        settings.unit = 'imperial';
      }

    }

    settings.setValues = function(){
      conection.setSettings(settings.location, settings.autoDefine, settings.notification, settings.time, settings.unit);
    }


  }

})();
