(function(){
'use strict';

angular.module('starter')
  .config(function($stateProvider){
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });

})();
