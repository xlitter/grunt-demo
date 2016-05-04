angular.module('app').controller('AboutCtrl', function ($scope, $location, utils) {
  'use strict';

  var vm = $scope,
    path = $location.path(),
    hash = $location.hash();

  if (hash === utils.hash) {
    $location.url(path);
    $location.replace();
    return;
  }
  
  vm.check = function(item){
    console.log(item);
  };
  return vm;
});
