(function(){
  'use strict';

  angular
    .module('starter')
    .controller('MainController', MainController);

  function MainController (conection){
    var main = this;
    this.conection = conection;
    main.title = 'Test main controller';

   main.getWeather = function () {
      main.conection.getWeather('london' , 'imperial')
      .then(function (res){
        main.weather = res.data;
      });
    }();
  }

})();
