'use strict';

angular.module('convergence')
.controller('ViewCtrl', function($rootScope, $scope, $state, Facebook, Twitter, Instagram){
  function checkFilter(post){
    if(post.filter !== 'normal' && (post.tags.indexOf('no-filter') !== -1 || post.tags.indexOf('nofilter') !== -1)){
      return true;
    }
    return false;
  }

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
          if(checkFilter(response.data)){
            $scope.liarLiar = true;
          }
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

  $scope.savePost = function(post){
    console.log(post);
    if(post.from){
      Facebook.savePost(post);
      $state.go('saved');
    }else if(post.user.screen_name){
      Twitter.savePost(post);
      $state.go('saved');
    }else if(post.user.profile_picture){
      Instagram.savePost(post);
      $state.go('saved');
    }
  };
});
