'use strict';

angular.module('convergence')
.factory('Facebook', function(ezfb, $rootScope, $http){
  function Facebook(){
  }

  Facebook.profleFeed = function(){
    // return ezfb.api('/me/permissions');
    $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.facebookCredentials.authResponse.accessToken;
    return ezfb.api('https://graph.facebook.com/me/feed');
  };


  // public feed access not allowed by facebook at the moment
  // -- possible loophole --
  // get to active user friends list, loop through each friend, pull first N from page feed
  // store all on scope
  // group all and sort by date
  // add to home page mix feed
  Facebook.feed = function(){
    return ezfb.api('/me/feed?access_token=CAACEdEose0cBAEo49yC1rbh04UZAinwZCF0b68wJk40Pl1USf0P2LKHB3W3v3NUKiXuFmPXHQ1CyNxnhTgRlO4E374EaCvkYhnF5E7vjQU8OM1s2V8w9845TfJ3pVXveEBWUTTx7yZAmf6qGZBAEnn4CEKZC0J4MVYZBRP7vwbh2fHW7ZAk15OQrhwFEJxv9BAz2CEI3kMTC9cIMAYT1X5Q');
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
