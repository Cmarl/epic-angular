'use strict';
/* eslint camelcase:0 */

angular.module('convergence')
.controller('SavedCtrl', function($rootScope, $state, $scope, Facebook, Twitter, Instagram){
  $scope.posts = {};

  Facebook.getSaved()
  .then(function(response){
    console.log(response);
    Instagram.getSaved()
    .then(function(response2){
      console.log(response2);
      Twitter.getSaved()
      .then(function(response3){
        console.log(response3);
      });
    });
  });
});
