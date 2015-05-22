'use strict';

angular.module('converger')
.factory('Facebook', function(ezfb, $rootScope){
  function Facebook(){
  }

  Facebook.myInfo = function(){
    return ezfb.api('/me');
  };

  Facebook.status = function(){
    ezfb.getLoginStatus(function(res){
      $rootScope.loginStatus = res;
    });
  };

  Facebook.login = function(){
    if($rootScope.loginStatus.status !== 'connected'){
      return ezfb.login();
    }
  };

  Facebook.logout = function(){
    if($rootScope.loginStatus.status === 'connected'){
      return ezfb.logout();
    }
  };

  return Facebook;
});
