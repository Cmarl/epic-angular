'use strict';

angular.module('convergence')
.controller('ViewCtrl', function($rootScope, $scope, $state, Facebook, Twitter, Instagram){
  $scope.getPost = function(id, provider){
    switch(provider){
      case 'facebook':
        Facebook.getPost(id)
        .then(function(response){
          $scope.post = response;
          $scope.post.comments = $rootScope.fbPost.comments;
          $scope.post.message = $rootScope.fbPost.message;
          $scope.$apply();
        });
        break;
      case 'instagram':
        Instagram.getPost(id)
        .then(function(response){
          $scope.post = response.data;
          $scope.$apply();
        });
        break;
      case 'twitter':
        Twitter.getPost(id)
        .then(function(response){
          $scope.post = response;
          $scope.$apply();
        });
        break;
    }
  };

  $scope.getPost($state.params.postId, $state.params.provider);
});
