'use strict';

angular.module('convergence')
.factory('Facebook', function(ezfb, $rootScope, $http){
  function Facebook(){
  }

  Facebook.feed = function(){
    // return ezfb.api('/me/permissions');
    $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.facebookCredentials.authResponse.accessToken;
    return ezfb.api('https://graph.facebook.com/me/feed');
  };

  Facebook.userInfo = function(){
    return ezfb.api('/me');
  };

  Facebook.photo = function(){
    return ezfb.api('/me/picture');
  };

  Facebook.updateCredentials = function(){
    ezfb.getLoginStatus(function(response){
      $rootScope.facebookCredentials = response;
    });
  };

  Facebook.login = function(){
    ezfb.login(function(){
      Facebook.updateCredentials();
    }, {scope: 'email,user_likes,user_friends,user_about_me,user_photos,'});
  };

  Facebook.logout = function(){
    if($rootScope.facebookCredentials.status === 'connected'){
      return ezfb.logout();
    }
  };

  return Facebook;
});
