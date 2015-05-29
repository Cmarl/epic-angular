'use strict';
/* eslint camelcase:0 */

angular.module('convergence')
.controller('HomeCtrl', function($state, $scope, Facebook, Twitter, Instagram){
  $scope.facebookLoadFeed = function(){
    if($scope.facebookCredentials){
      Facebook.feed()
      .then(function(fFeed){
        if(fFeed){
          $scope.fbFeed = fFeed.data;
          $scope.fbPaging = fFeed.paging;
          $scope.$apply();
        }
      });
    }
  };

  $scope.twitterLoadFeed = function(){
    if($scope.twitterCredentials){
      $scope.twLoading = true;
      Twitter.feed()
      .then(function(tFeed){
        if(tFeed){
          $scope.twLoading = false;
          $scope.twFeed = tFeed;
          $scope.$apply();
        }
      });
    }
  };

  $scope.instagramLoadFeed = function(){
    if($scope.instagramCredentials){
      $scope.igLoading = true;
      Instagram.feed()
      .then(function(iFeed){
        $scope.igLoading = false;
        $scope.igFeed = iFeed;
        $scope.$apply();
      });
    }
  };

  $scope.init = function(){
    $scope.facebookLoadFeed();
    $scope.twitterLoadFeed();
    $scope.instagramLoadFeed();
    $scope.splitFeed = false;
    $scope.splitFeed = true;
    $scope.$apply();
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
    if($scope.igFeed){
      $scope.igFeed.data.forEach(function(post){
        $scope.mixFeed.push(post);
      });
    }

    // randomize order of mixFeed array elements
    for(var i = $scope.mixFeed.length; i > 0; i--){
      var randI = Math.floor(Math.random() * (i + 1));
      var hold = $scope.mixFeed[i];
      $scope.mixFeed[i] = $scope.mixFeed[randI];
      $scope.mixFeed[randI] = hold;
    }
  }

  $scope.viewPost = function(post){
    console.log(post);
    if(post.from){
      $state.go('view', {postId: post.object_id, provider: 'facebook'});
    }else if(post.lang){
      $state.go('view', {postId: post.id, provider: 'twitter'});
    }else if(post.filter){
      $state.go('view', {postId: post.id, provider: 'instagram'});
    }
  };

  $scope.toggleFeedView = function(){
    $scope.mixedFeed = !$scope.mixedFeed;
    $scope.splitFeed = !$scope.splitFeed;
    if($scope.mixedFeed){mixFeeds(); }else{$scope.mixFeed = []; }
  };

  $scope.toggleIGLike = function(post, index){
    if(post.user_has_liked){
      console.log('un-like');
      $scope.igFeed.data[index].user_has_liked = false;
      Instagram.unlike(post.id);
    }else{
      console.log('like');
      $scope.igFeed.data[index].user_has_liked = true;
      Instagram.like(post.id);
    }
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

  $scope.instagramNextPosts = function(){
    $scope.igLoading = true;
    Instagram.feed($scope.igFeed.pagination.next_url)
    .then(function(iFeed){
      $scope.igFeed.pagination = iFeed.pagination;
      iFeed.data.forEach(function(post){
        $scope.igFeed.data.push(post);
      });
      $scope.igLoading = false;
    });
  };
});
