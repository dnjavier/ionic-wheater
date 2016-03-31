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
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;
      console.log('Lat: '+crd.latitude);
      console.log('Lat: '+crd.longitude);
      console.log('Lat: '+crd.accuracy+ ' meters.');
    };

    function error(err) {
      alert('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);


    main.getWeather = function () {
      main.connection.getWeather(main.connection.settings.location , main.connection.settings.unit)
      .then(function (res){
        main.weather = res.data;
      });
    }();
  }

})();
