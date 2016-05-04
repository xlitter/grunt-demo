angular.module('app').service('MainService', function($q) {

  'use strict';

  return {
    getUserName: function(params) {
      var defer = $q.defer(),
        mockData = {
          name: params.name || 'John',
          sex: 'm'
        };

      defer.resolve(mockData);
      return defer.promise;
    },
    getUserAge: function(params) {
      var defer = $q.defer(),
        mockData = {
          age: params.age || '21'
        };
      setTimeout(function() {
        defer.resolve(mockData);
      }, 0);

      return defer.promise;
    },
    getAll : function(){
      return $q.all([this.getUserName({}), this.getUserAge({})]);
    }
  };

});
