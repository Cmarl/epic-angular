'use strict';

angular.module('convergence')
.controller('HomeCtrl', function($scope, Facebook, Twitter){
  $scope.mixedFeed = false;
  $scope.splitFeed = true;

  function mixFeeds(){
    $scope.mixFeed = [];

    $scope.twFeed.forEach(function(post){
      $scope.mixFeed.push(post);
    });

    $scope.fbFeed.forEach(function(post){
      $scope.mixFeed.push(post);
    });

    // refactorrrr
    $scope.mixFeed.sort(function(previous, current){
      if(Date.parse(previous.created_at) && Date.parse(current.created_at)){
        return Date.parse(previous.created_at) > Date.parse(current.created_at);
      }else if(Date.parse(previous.created_time) && Date.parse(current.created_time)){
        return Date.parse(previous.created_time) > Date.parse(current.created_time);
      }else if(Date.parse(previous.created_time) && Date.parse(current.created_at)){
        return Date.parse(previous.created_time) > Date.parse(current.created_at);
      }else if(Date.parse(previous.created_at) && Date.parse(current.created_time)){
        return Date.parse(previous.created_at) > Date.parse(current.created_time);
      }
    });
  }

  $scope.toggleFeedView = function(){
    $scope.mixedFeed = !$scope.mixedFeed;
    $scope.splitFeed = !$scope.splitFeed;

    if($scope.mixedFeed){mixFeeds(); }else{$scope.mixFeed = []; }
  };


  Facebook.feed()
  .then(function(fFeed){
    $scope.fbFeed = fFeed.data;
  });

  Twitter.feed()
  .then(function(tFeed){
    $scope.twFeed = tFeed;
  });
});
