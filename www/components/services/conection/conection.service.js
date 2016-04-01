(function () {
  'use strict';
  angular
  .module('starter')

  .factory('conection', conection);

  function conection ($http, $cordovaLocalNotification){

    var settings = {
      unit: 'c',
      unitColor: true,
      location: 'Kiev',
      autoDefine: true,
      notification: false,
      unit: 'imperial',
      time: new Date(),
      lat: '',
      lon: ''
    };

    var locationResult = {
      city: '',
      temp: ''
    };

    var setSettings = function(config) {
      settings = config;
    }

    var getWeather = function (city , unit , lat, lon) {
      if (city ==='current location') {
        return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=1&mode=json&units=' + unit + '&cnt=1&APPID=b9b919d37886ed6661083dad462660ea');
      }

      return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&mode=json&units=' + unit + '&cnt=1&APPID=b9b919d37886ed6661083dad462660ea');
    }

    var notification = function(location, alarmTime, lat, lon){
      var time = new Date();
      time.setHours(alarmTime.getHours(), alarmTime.getMinutes(), 0, 0);

      getWeather(location , settings.unit, lat, lon)
      .then(function (res){
        var objNotification = {
          id: '12345',
          firstAt: time,
          every: 'day',
          message: 'Temperature is ' + res.data.list[0].temp.day,
          title: res.data.city.name
        }

        $cordovaLocalNotification.add(objNotification)
        .then(function () {
            console.log('The notification has been set');
        });
      });
    }

    return {
      getWeather: getWeather,
      setSettings: setSettings,
      settings: settings,
      notification: notification
    }
  }

})();

