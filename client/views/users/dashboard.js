'use strict';

angular.module('convergence')
.controller('DashCtrl', function($rootScope, $scope, Facebook, Twitter, Instagram){
  Facebook.updateCredentials();
  if($rootScope.twitterCredentials){
    Twitter.login()
    .then(function(routes){
      routes.me()
      .then(function(user){
        $rootScope.twitterUserInfo = user;
        $scope.$apply();
      });
    });
  }

  Facebook.userInfo()
  .then(function(fbResponse){
    $rootScope.facebookUserInfo = fbResponse;
    $scope.$apply();
    Facebook.friendList()
    .then(function(list){
      $rootScope.facebookUserInfo.friendList = list;
      Facebook.photo()
      .then(function(photo){
        $rootScope.facebookPhoto = photo.data.url;
        $scope.$apply();
      });
    });
  });

  if(!$rootScope.instagramCredentials){
    Instagram.login()
    .then(function(igResponse){
      $rootScope.instagramCredentials = igResponse;
      igResponse.me()
      .then(function(user){
        $rootScope.instagramUserInfo = user;
        $scope.$apply();
      });
    });
  }

  $scope.addProvider = function(provider){
    switch(provider){
      case 'Facebook':
        Facebook.login();
        break;
      case 'Twitter':
        Twitter.login()
        .then(function(response){
          $rootScope.twitterCredentials = response;
          $scope.$apply();
        });
        break;
      case 'Instagram':
        Instagram.login()
        .then(function(response){
          $rootScope.instagramCredentials = response;
          response.me()
          .then(function(user){
            $rootScope.instagramUserInfo = user;
            $scope.$apply();
          });
        });
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
      case 'Instagram':
        console.log('Instagram');
        break;
    }
  };
});
