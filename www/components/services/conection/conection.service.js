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

    var setSettings = function(location, autoDefine, notification, time, unit,lat,lon) {
      settings.location = location;
      settings.autoDefine = autoDefine;
      settings.notification = notification;
      settings.time = time;
      settings.unit = unit;
      settings.lat = lat;
      settings.lon = lon;
    }

    var getWeather = function (city , unit , lat, lon) {
      if (city ==='current location') {
        return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=1&mode=json&units=' + unit + '&cnt=1&APPID=b9b919d37886ed6661083dad462660ea');
      }
      return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&mode=json&units=' + unit + '&cnt=1&APPID=b9b919d37886ed6661083dad462660ea');

       
    }

    return {
      getWeather : getWeather,
      setSettings : setSettings,
      settings : settings
    }
  }

})();

