'use strict';

angular.module('convergence')
.factory('Facebook', function(ezfb, $rootScope, $http, nodeUrl){
  function Facebook(){
  }

  Facebook.deleteSaved = function(post){
    return $http.delete(nodeUrl + '/posts/fbposts/' + post._id);
  };

  Facebook.getSaved = function(){
    return $http.get(nodeUrl + '/posts/fbposts');
  };

  Facebook.savePost = function(post){
    return $http.post(nodeUrl + '/posts/fbposts', post);
  };

  Facebook.getPost = function(id){
    return ezfb.api('https://graph.facebook.com/' + id);
  };

  Facebook.profleFeed = function(){
    if($rootScope.facebookCredentials){
      return ezfb.api('https://graph.facebook.com/me/feed');
    }
  };

  Facebook.friendList = function(){
    return ezfb.api('/me/friends');
  };

  Facebook.feed = function(page){
    return ezfb.api(page || '/me/feed');
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
    }, {scope: 'email,user_likes,user_friends,user_about_me,user_photos,user_posts,user_birthday,user_status,user_videos'});
  };

  Facebook.logout = function(){
    return ezfb.logout();
  };

  return Facebook;
});
