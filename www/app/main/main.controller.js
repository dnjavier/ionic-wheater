(function(){
  'use strict';

  angular
    .module('starter')
    .controller('MainController', MainController);

  function MainController (conection){
    var main = this;
    main.connection = conection;
    main.title = 'Test main controller';


  // settings.location = location;
  // settings.autoDefine = autoDefine;
  // settings.notification = notification;
  // settings.time = time;
  // settings.unit = unit;
  //



    main.getWeather = function () {
      main.connection.getWeather(main.connection.settings.location , main.connection.settings.unit)
      .then(function (res){
        main.weather = res.data;
      });
    }();
  }

})();
