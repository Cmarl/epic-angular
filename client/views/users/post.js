'use strict';

angular.module('convergence')
.controller('PostCtrl', function($scope){
  $scope.post = {};

  $scope.send = function(post){
    console.log(post);
  };
});
