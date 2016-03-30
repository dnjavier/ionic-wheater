(function () {
  'use strict';
  angular
  .module('starter')

  .factory('conection', conection);

  function conection ($http){

    var getWeather = function (city , unit) {
      return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&mode=json&units=' + unit + '&cnt=1&APPID=b9b919d37886ed6661083dad462660ea');
    }

    return {
      getWeather : getWeather
    }
  }

})();

