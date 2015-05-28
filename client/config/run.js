'use strict';

angular.module('convergence')
.run(function($rootScope, $window, $firebaseAuth, firebaseUrl, ezfb){
  $rootScope.fbRoot = new $window.Firebase(firebaseUrl);
  $rootScope.afAuth = $firebaseAuth($rootScope.fbRoot);
  ezfb.init({
    appId: '650188588414568'
  });
  $window.OAuth.initialize('zKqkBwHoH-ny8pW6pUPjJfCnJag', 'juhc8Wxt-ZE11s5ajjb9H_O0By0');
});
