(function(){
  'use strict';

  angular
    .module('starter')
    .controller('MainController', MainController);

  function MainController (conection){
    var main = this;
    main.windDirection = 'West';
    main.connection = conection;
    main.title = 'Test main controller';

    main.getWeather = function () {
      main.connection.getWeather(main.connection.settings.location , main.connection.settings.unit)
      .then(function (res){
        main.windDirection = setDirection(res.data.list[0].deg);
        main.weather = res.data;
      });
    }();


    function setDirection(degrees){
      var deg = degrees;

      if(deg > 85 && deg < 95){
        return 'North';
      }

      if(deg > 94 && deg < 174){
        return 'North-East';
      }

      if(deg > 175 && deg < 185){
        return 'East';
      }

      if(deg > 184 && deg < 264){
        return 'South-East';
      }

      if(deg > 265 && deg < 275){
        return 'South';
      }

      if(deg > 274 && deg < 354){
        return 'South-West';
      }

      if(deg < 5 && deg > 355){
        return 'West';
      }

      if(deg > 4 && deg < 84){
        return 'North-West';
      }
    }

  }

})();
