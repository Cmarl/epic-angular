'use strict';

angular.module('convergence')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html', controller: 'HomeCtrl'})
  .state('saved', {url: '/saved', templateUrl: '/views/general/saved.html', controller: 'SavedCtrl'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('dashboard', {url: '/dashboard', templateUrl: '/views/users/dashboard.html', controller: 'DashCtrl'})
  .state('view', {url: '/{postId}/{provider}', templateUrl: '/views/post/view.html', controller: 'ViewCtrl'});
})
.config(function(ezfbProvider){
  ezfbProvider.setLocale('en_US');
});
