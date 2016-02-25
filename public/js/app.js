angular
  .module('logging', ['ngResource', 'angular-jwt', 'ui.router','uiGmapgoogle-maps'])
  .constant('API', '/api')
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: "AIzaSyDnS0G9GCV5Zhq7m8dNwIgvzHVU5TNpQrI",
          v: '3.20', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  })

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "./js/views/home.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "./js/views/login.html"
      })
      .state('register', {
        url: "/register",
        templateUrl: "./js/views/register.html"
      })
      .state('gallery', {
        url: "/gallery",
        templateUrl: "./js/views/gallery.html"
      })
      .state('users', {
        url: "/users",
        templateUrl: "./js/views/users.html"
      })
      .state('bookings', {
        url: "/bookings",
        templateUrl: "./js/views/bookings.html"
      })
      .state('addbooking', {
        url: "/booking/new",
        templateUrl: "./js/views/addbooking.html"
      })
      .state('admin', {
        url: "/booking/admin",
        templateUrl: "./js/views/admin.html",
        controller: "BookingsController as bookings"
      })
      .state('reviews', {
        url: "/booking/reviews",
        templateUrl: "./js/views/reviews.html",
        controller: "BookingsController as bookings"
      })
      .state('approvedBookings', {
        url: "/booking/approvedBookings",
        templateUrl: "./js/views/admin.html"
      })
      .state('archivedBookings', {
        url: "/booking/archivedBookings",
        templateUrl: "./js/views/admin.html"
      })
      .state('update', {
        url: "/booking/update",
        templateUrl: "./js/views/update.html"
      });

    $urlRouterProvider.otherwise("/");
  }
