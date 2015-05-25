'use strict';

angular.module('convergence')
.controller('HomeCtrl', function($scope, Facebook, Twitter){
  $scope.mixedFeed = false;
  $scope.splitFeed = true;

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

  $scope.updateTweets = function(){
    $scope.twLoading = true;
    Twitter.feed()
    .then(function(tFeed){
      $scope.twLoading = false;
      $scope.twFeed = tFeed;
    });
  };

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
        $scope.fbPaging = fFeed.paging;
      }
    });
  }

  $scope.morePosts = function(provider){
    switch(provider){
      case 'facebook':
        $scope.fbLoading = true;
        Facebook.feed($scope.fbPaging.next)
        .then(function(fFeed){
          fFeed.data.forEach(function(post){
            $scope.fbFeed.push(post);
          });
          $scope.fbPaging = fFeed.paging;
          $scope.fbLoading = false;
        });
        break;
    }
  };

  Twitter.feed()
  .then(function(tFeed){
    if(tFeed){
      $scope.twFeed = tFeed;
    }
  });
});
