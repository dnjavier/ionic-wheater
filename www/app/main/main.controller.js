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
    console.log(main.city);
      this.conection.getWeather(main.city)
      .then(function (res){
        console.log(res.data)
        main.weather = res.data;
      });

      main.city ='';
    }


  }

})();
