'use strict';

angular.module('converger')
.controller('DashCtrl', function($scope, Facebook){
  $scope.linkSocial = function(provider){
    switch(provider){
      case 'Facebook':
        if($scope.loginStatus.status !== 'connected'){
          Facebook.login().then(function(){
            Facebook.status();
          });
        }
        break;
      case 'Twitter':
        console.log('Twitter');
        break;
      case 'Pinterest':
        console.log('Pinterest');
        break;
      case 'Google':
        console.log('Google');
        break;
    }
  };

  if($scope.loginStatus.status === 'connected'){
    Facebook.myInfo().then(function(response){
      $scope.myInfo = response;
    });
  }

  $scope.logout = function(){
    Facebook.logout().then(function(){
      Facebook.status();
    });
  };
});
