'use strict';

angular.module('convergence')
.run(function($rootScope, $window, $firebaseAuth, firebaseUrl, ezfb){
  $rootScope.fbRoot = new $window.Firebase(firebaseUrl);
  $rootScope.afAuth = $firebaseAuth($rootScope.fbRoot);
  ezfb.init({
    appId: '650188588414568'
  });
  $window.OAuth.initialize('8t4o_6naCBJuo3MPdKoM1yZTbME', 'OfS3b9XHLmN3XPMs_ZU2cWb5ZbM');
});
