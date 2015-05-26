'use strict';

angular.module('convergence')
.controller('DashCtrl', function($rootScope, $scope, Facebook, Twitter){
  Twitter.login()
  .then(function(routes){
    routes.me()
    .then(function(user){
      $rootScope.twitterUserInfo = user;
    });
  });

  Twitter.userInfo()
  .then(function(twResponse){
    $rootScope.twitterUserInfo = twResponse;
    Facebook.userInfo()
    .then(function(fbResponse){
      $rootScope.facebookUserInfo = fbResponse;
      Facebook.friendList()
      .then(function(list){
        $rootScope.facebookUserInfo.friendList = list;
        Facebook.photo()
        .then(function(photo){
          $rootScope.facebookPhoto = photo.data.url;
        });
      });
    });
  });

  $scope.addProvider = function(provider){
    switch(provider){
      case 'Facebook':
        Facebook.login();
        break;
      case 'Twitter':
        Twitter.login();
        break;
      case 'Pinterest':
        console.log('Pinterest');
        break;
      case 'Google':
        console.log('Google');
        break;
    }
  };

  $scope.logout = function(provider){
    switch(provider){
      case 'Facebook':
        Facebook.logout()
        .then(function(){
          Facebook.status();
        });
        break;

      case 'Twitter':
        Twitter.logout()
        .then(function(){
          Twitter.status();
        });
        break;

      case 'Pinterest':
        console.log('Pinterest');
        break;

      case 'Google':
        console.log('Google');
        break;
    }
  };
});
