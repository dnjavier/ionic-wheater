(function(){
  'use strict';

  angular
    .module('starter')
    .controller('SettingsController', SettingsController);

  function SettingsController(conection){
    var settings = this;

    settings.location = 'Kiev';
    settings.autoDefine = true;
    settings.notification = true;
    settings.unit;


    settings.temp = function(unit) {
      if(unit == 'c') {
        //sets celcious
      }

      if(unit == 'f') {
        //sets farengh
      }

    }

    settings.setValues = function(){
      conection.setSettings(settings.location, settings.autoDefine, settings.notification, settings.time, settings.unit);
    }


  }

})();
