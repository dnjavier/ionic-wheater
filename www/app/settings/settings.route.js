(function(){
'use strict';

angular.module('starter')
  .config(function($stateProvider){
    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      });
  });

})();
