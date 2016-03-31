(function(){
  'use strict';

  angular
    .module('starter')
    .controller('MainController', MainController);

  function MainController (conection , $cordovaDeviceOrientation){
    var main = this;
    main.connection = conection;
    main.title = 'Test main controller';

    main.getWeather = function () {
      main.connection.getWeather(main.connection.settings.location , main.connection.settings.unit)
      .then(function (res){
        main.weather = res.data;
      });
    }();

  main.dir = 0;

    var options = {
        frequency: 500
    };

    main.watchPromise = $cordovaDeviceOrientation.watchHeading(options);

    main.watchPromise.then(
            null, 
            function(error) {
                console.log(error);
                alert("no");
            }, 
            function(result) {
                main.dir = result.trueHeading;
                alert("yes");
            }
        );

  }

})();
