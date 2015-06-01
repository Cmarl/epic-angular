'use strict';

angular.module('convergence')
.factory('Twitter', function($rootScope, $window, $http, nodeUrl){
  function Twitter(){
  }

  Twitter.deleteSaved = function(post){
    return $http.delete(nodeUrl + '/posts/tweets/' + post._id);
  };

  Twitter.getSaved = function(){
    return $http.get(nodeUrl + '/posts/tweets');
  };

  Twitter.savePost = function(post){
    return $http.post(nodeUrl + '/posts/tweets', post);
  };

  Twitter.getPost = function(id){
    return $rootScope.twitterCredentials.get('https://api.twitter.com/1.1/statuses/show.json?id=' + id);
  };

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
