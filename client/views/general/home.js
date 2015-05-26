'use strict';

angular.module('convergence')
.controller('HomeCtrl', function($scope, Facebook, Twitter, Instagram){
  $scope.facebookLoadFeed = function(){
    Facebook.feed()
    .then(function(fFeed){
      if(fFeed){
        $scope.fbFeed = fFeed.data;
        $scope.fbPaging = fFeed.paging;
      }
    });
  };

  $scope.twitterLoadFeed = function(){
    $scope.twLoading = true;
    Twitter.feed()
    .then(function(tFeed){
      if(tFeed){
        $scope.twLoading = false;
        $scope.twFeed = tFeed;
      }
    });
  };

  $scope.instagramLoadFeed = function(){
    $scope.igLoading = true;
    Instagram.feed()
    .then(function(iFeed){
      $scope.igLoading = false;
      $scope.igFeed = iFeed;
    });
  };

  $scope.init = function(){
    $scope.facebookLoadFeed();
    $scope.twitterLoadFeed();
    $scope.instagramLoadFeed();
    $scope.splitFeed = true;
  };
  $scope.init();


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
    // refactorrrr sorting facebook and twitter posts into single list ordered by date
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

  $scope.facebookNextPosts = function(){
    $scope.fbLoading = true;
    Facebook.feed($scope.fbPaging.next)
    .then(function(fFeed){
      fFeed.data.forEach(function(post){
        $scope.fbFeed.push(post);
      });
      $scope.fbPaging = fFeed.paging;
      $scope.fbLoading = false;
    });
  };
});
