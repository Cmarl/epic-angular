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
        });
        console.log($scope.posts);
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
    console.log('in remover::::= ', post);
    return $window._.remove($scope.posts, function(p){
      return p.id !== post.id;
    });
  }

  $scope.removeSaved = function(post){
    if(post.provider === 'Twitter'){
      Twitter.deleteSaved(post)
      .then(function(tPost){
        $scope.posts = removeDeleted(tPost.data);
      });
    }else if(post.provider === 'Facebook'){
      Facebook.deleteSaved(post)
      .then(function(fPost){
        $scope.posts = removeDeleted(fPost.data);
      });
    }else if(post.provider === 'Instagram'){
      Instagram.deleteSaved(post)
      .then(function(iPost){
        $scope.posts = removeDeleted(iPost.data);
      });
    }
  };
});
