(function () {
  'use strict';
  angular
  .module('starter')

  .factory('conection', conection);

  function conection ($http){

    var getWeather = function (city) {
      return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=b9b919d37886ed6661083dad462660ea');
    }

    return {
      getWeather : getWeather
    }
  }

})();

