(function(){
  'use strict';

  angular
    .module('starter')
    .controller('MainController', MainController);

  function MainController (conection , $cordovaDeviceOrientation){
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

    document.addEventListener("deviceready", function () {

      $cordovaDeviceOrientation.getCurrentHeading().then(function(result) {
         var magneticHeading = result.magneticHeading;
         var trueHeading = result.trueHeading;
         var accuracy = result.headingAccuracy;
         var timeStamp = result.timestamp;
         console.log('success');
         alert('38');
      }, function(err) {
        // An error occurred
        console.log('error');
      });



      var options = {
        frequency: 3000,
        filter: true     // if frequency is set, filter is ignored
      }

      var watch = $cordovaDeviceOrientation.watchHeading(options).then(
        null,
        function(error) {
          // An error occurred
          console.log('error');
        },
        function(result) {   // updates constantly (depending on frequency value)
          var magneticHeading = result.magneticHeading;
          var trueHeading = result.trueHeading;
          var accuracy = result.headingAccuracy;
          var timeStamp = result.timestamp;
          console.log('success');
          alert('63');
        });


      watch.clearWatch();
      // OR
      $cordovaDeviceOrientation.clearWatch(watch)
        .then(function(result) {
          // Success!
          console.log('success');
          alert('73');
        }, function(err) {
          // An error occurred
          console.log('error');
        });

    }, false);

  }

})();
