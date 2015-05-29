'use strict';

angular.module('convergence')
.controller('ViewCtrl', function($scope, $state, Facebook, Twitter, Instagram){
  $scope.getPost = function(id, provider){
    switch(provider){
      case 'facebook':
        Facebook.getPost(id)
        .then(function(response){
          $scope.post = response;
        });
        break;
      case 'instagram':
        Instagram.getPost(id)
        .then(function(response){
          $scope.post = response;
        });
        break;
      case 'twitter':
        Twitter.getPost(id)
        .then(function(response){
          $scope.post = response;
        });
        break;
    }
  };

  $scope.post = $scope.getPost($state.params.postId, $state.params.provider);
});
