'use strict';

angular.module('convergence')
.controller('HomeCtrl', function($scope, Facebook, Twitter){
  $scope.mixedFeed = true;
  $scope.splitFeed = false;

  function mixFeeds(){
    $scope.mixFeed = [];

    if($scope.twFeed){
      $scope.twFeed.forEach(function(post){
        $scope.mixFeed.push(post);
      });
    }

    if($scope.fbFeed){
      $scope.fbFeed.forEach(function(post){
        $scope.mixFeed.push(post);
      });
    }

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

  if($scope.facebookCredentials){
    Facebook.feed()
    .then(function(fFeed){
      if(fFeed){
        $scope.fbFeed = fFeed.data;
      }
    });
  }

  Twitter.feed()
  .then(function(tFeed){
    if(tFeed){
      $scope.twFeed = tFeed;
    }
  });
});
