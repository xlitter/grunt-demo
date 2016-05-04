var app = angular.module('app', ['ngRoute']);


app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.when('/main/:name/:age', {
    templateUrl : 'views/main.html',
    controller : 'MainCtrl',
    resolve: {
      userAge : function($route,MainService){
        return MainService.getUserAge({age: $route.current.age})
      }
    } 
  }).when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  }).otherwise('/about');
  $locationProvider.hashPrefix('!');
}]);

app.constant('utils', {}).run(function($rootScope,utils){
  utils.hash = '123123123';
  $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl){
    console.log(newUrl, oldUrl);
  });
  
});