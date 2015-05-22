'use strict';

angular.module('converger')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html', controller: 'HomeCtrl'})
  .state('about', {url: '/about', templateUrl: '/views/general/about.html'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('dashboard', {url: '/dashboard', templateUrl: '/views/users/dashboard.html', controller: 'DashCtrl'});
})
.config(function(ezfbProvider){
  ezfbProvider.setLocale('en_US');
});
