'use strict';
/* eslint camelcase:0 */

angular.module('convergence')
.controller('SavedCtrl', function($rootScope, $state, $scope, Facebook, Twitter, Instagram){
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
});
