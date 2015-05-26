'use strict';

angular.module('convergence')
.run(function($rootScope, $window, $firebaseAuth, firebaseUrl, ezfb){
  $rootScope.fbRoot = new $window.Firebase(firebaseUrl);
  $rootScope.afAuth = $firebaseAuth($rootScope.fbRoot);
  ezfb.init({
    appId: '650188588414568'
  });
  $window.OAuth.initialize('XX54xT683-X-BE306sZv_RDL_UI');
});
