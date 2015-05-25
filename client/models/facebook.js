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
    return ezfb.api('/me/feed?access_token=CAACEdEose0cBAIZCtrz2RXuZCaZBvcoHHZBr5ZA5lnYmu2IE958XMc7jfSZBNVxqglGYI78MEUyjLNR2tNdxmMjpuk3pd4Q2ZAgBZANBE3ZAkLFYDDqPWSwpyTluRJiZC5IIH5KsRZAnQm8ldRIpO6eg0b2I6uCEOYm8RIPAzeOL3iuW4DjlLDJQj4xZBDwrazVlgIMeYv2YlFsjOoUFAd5dEAxt');
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
