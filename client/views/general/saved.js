'use strict';
/* eslint camelcase:0 */

angular.module('convergence')
.controller('SavedCtrl', function($rootScope, $state, $scope, Facebook, Twitter, Instagram, $window){
  $scope.posts = [];

  Facebook.getSaved()
  .then(function(responseF){
    responseF.data.results.forEach(function(post){
      $scope.posts.push(post);
    });
    Instagram.getSaved()
    .then(function(responseI){
      responseI.data.results.forEach(function(post){
        $scope.posts.push(post);
      });
      Twitter.getSaved()
      .then(function(responseT){
        responseT.data.results.forEach(function(post){
          $scope.posts.push(post);
          console.log($scope.posts);
        });
      });
    });
  });

  $scope.viewPost = function(post){
    if(post.from){
      $rootScope.fbPost = post;
      $state.go('view', {postId: post.object_id ? post.object_id : post.id, provider: 'facebook'});
    }else if(post.lang){
      $state.go('view', {postId: post.id_str, provider: 'twitter'});
    }else if(post.filter){
      $state.go('view', {postId: post.id, provider: 'instagram'});
    }
  };

  function removeDeleted(post){
    $window._.remove($scope.posts, function(current){
      return post._id === current._id;
    });
    $scope.$apply();
  }

  $scope.removeSaved = function(post){
    if(post.provider === 'Twitter'){
      Twitter.deleteSaved(post)
      .then(function(tPost){
        removeDeleted(tPost);
      });
    }else if(post.provider === 'Facebook'){
      Facebook.deleteSaved(post)
      .then(function(fPost){
        removeDeleted(fPost);
      });
    }else if(post.provider === 'Instagram'){
      Instagram.deleteSaved(post)
      .then(function(iPost){
        removeDeleted(iPost);
      });
    }
  };
});
