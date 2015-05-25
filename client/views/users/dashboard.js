'use strict';

angular.module('convergence')
.controller('DashCtrl', function($rootScope, $scope, Facebook, Twitter, $window){
  if($scope.facebookCredentials.status === 'connected'){
    Facebook.userInfo().then(function(response){
      $rootScope.facebookUserInfo = response;
      Facebook.friendList().then(function(list){
        $rootScope.facebookUserInfo.friendList = list;
      });
    });
    Facebook.photo().then(function(photo){
      $rootScope.facebookPhoto = photo.data.url;
    });
  }
  if($rootScope.twitterCredentials){
    Twitter.userInfo()
    .then(function(response){
      $rootScope.twitterUserInfo = response;
    });
  }

  $scope.addProvider = function(provider){
    switch(provider){
      case 'Facebook':
        if($scope.facebookCredentials.status !== 'connected'){
          Facebook.login();
        }
        break;

      case 'Twitter':
        $window.OAuth.popup('twitter', {cache: true})
        .done(function(twitter){
          twitter.me()
          .done(function(info){
            $rootScope.twitterUserInfo = info;
          });
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

  $scope.logout = function(provider){
    switch(provider){
      case 'Facebook':
        Facebook.logout().then(function(){
          Facebook.status();
        });
        break;

      case 'Twitter':
        Twitter.logout().then(function(){
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
