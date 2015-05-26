'use strict';

angular.module('convergence')
.factory('Twitter', function($rootScope, $window){
  function Twitter(){
  }

  Twitter.feed = function(){
    return $rootScope.twitterCredentials.get('https://api.twitter.com/1.1/statuses/home_timeline.json?count=100');
  };

  Twitter.userInfo = function(){
    return $rootScope.twitterCredentials.me();
  };

  Twitter.login = function(){
    return $window.OAuth.popup('twitter', {cache: true});
  };

  Twitter.logout = function(){
    return $window.OAuth.logout('twitter');
  };

  return Twitter;
});
