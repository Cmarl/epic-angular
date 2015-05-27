'use strict';

angular.module('convergence')
.factory('Instagram', function($rootScope, $window){
  function Instagram(){
  }

  Instagram.feed = function(url){
    if(url){
      return $rootScope.instagramCredentials.get(url);
    }else if(!url){
      return $rootScope.instagramCredentials.get('https://api.instagram.com/v1/users/self/feed');
    }
  };

  Instagram.unlike = function(id){
    return $rootScope.instagramCredentials.post('https://api.instagram.com/v1/media/');
  };

  Instagram.like = function(id){
    return $rootScope.instagramCredentials.delete('https://api.instagram.com/v1/media/');
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
