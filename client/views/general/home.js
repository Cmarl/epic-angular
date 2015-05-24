'use strict';

angular.module('convergence')
.controller('HomeCtrl', function($scope, Facebook, Twitter){
  Facebook.feed().then(function(response){
    console.log(response);
  });

  Twitter.feed()
  .then(function(feed){
    $scope.posts = feed;
  });
});
