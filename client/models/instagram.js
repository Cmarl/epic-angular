'use strict';

angular.module('convergence')
.factory('Instagram', function($rootScope, $window){
  function Instagram(){
  }

  Instagram.feed = function(){
    return $rootScope.instagramCredentials.get('https://api.instagram.com/v1/users/self/feed');
  };

  Instagram.userInfo = function(){
    return $rootScope.instagramCredentials.me();
  };

  Instagram.login = function(){
    return $window.OAuth.popup('instagram', {cache: true});
  };

  Instagram.logout = function(){
    return $window.OAuth.logout('instagram');
  };

  return Instagram;
});
