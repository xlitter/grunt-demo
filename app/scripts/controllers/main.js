angular.module('app').controller('MainCtrl', function($scope, $routeParams, $location, utils, MainService, userAge) {
  'use strict';

  var vm = $scope,
    formData = vm.formData = {
      age: userAge.age
    };

  function getUserName() {
    var params = {
      name: $routeParams.name
    };
    MainService.getUserName(params).then(function(data) {
      vm.user = data;
    });
  }

  function getAll() {
    MainService.getAll().then(function(datas) {
      console.log(datas);
    }, function(data){
      console.log('reject', data);
    } );
  }

  vm.toAbout = function() {
    $location.path('/about').hash(utils.hash);
  };

  getUserName();
  getAll();

  return vm;
});
