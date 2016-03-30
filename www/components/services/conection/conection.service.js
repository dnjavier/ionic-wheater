(function () {
  'use strict';
  angular
  .module('starter')

  .factory('conection', conection);

  function conection ($http){

    var settings = {
      location: 'Kiev',
      autoDefine: true,
      notification: false,
      time: new Date(),
      unit: 'imperial'
    };

    var setSettings = function(location, autoDefine, notification, time, unit) {
      settings.location = location;
      settings.autoDefine = autoDefine;
      settings.notification = notification;
      settings.time = time;
      settings.unit = unit;
    }

    var getWeather = function (city , unit) {
      return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&mode=json&units=' + unit + '&cnt=1&APPID=b9b919d37886ed6661083dad462660ea');
    }

    return {
      getWeather : getWeather,
      setSettings : setSettings,
      settings : settings
    }
  }

})();

