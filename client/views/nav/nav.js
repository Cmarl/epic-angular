'use strict';

angular.module('convergence')
.controller('NavCtrl', function($rootScope, $scope, $state, $http, User, $window, Facebook, Twitter){
  function getDisplayName(data){
    return data.password.email;
  }
  $scope.afAuth.$onAuth(function(data){
    if(data){
      $rootScope.activeUser = data;
      $rootScope.displayName = getDisplayName(data);
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      User.findOrCreate()
      .then(function(){
        $state.go('home');
      })
      .catch(function(){
        $window.swal({title: 'User Creation Error', text: 'Woops! We had a problem, Please try again.', type: 'error'});
      });
    }else{
      $rootScope.activeUser = null;
      $rootScope.displayName = null;
      $http.defaults.headers.common.Authorization = null;
    }
    $state.go('home');
  });

  Facebook.updateCredentials();
  $rootScope.twitterCredentials = $window.OAuth.create('twitter');

  $scope.logout = function(){
    User.logout();
  };
});
