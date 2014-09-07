angular.module('schluckspecht.bottleServiceRemote', [])
  .service('bottleServiceRemote', function($http) {

    var endpoint = "/service/bottle-service";
    var bottleTypesEndpoint = endpoint + "/bottle-types";
    var bottlesEndpoint = endpoint + "/bottles";

    this.getBottleTypes = function() {
      return $http.get(bottleTypesEndpoint + '/get');
    };

    this.addBottles = function(bottleTypeId, num) {
      return $http.post(bottlesEndpoint + '/add', {bottleTypeId: bottleTypeId, amount: num});
    };

    this.addBottleType = function(name, make) {
      return $http.post(bottleTypesEndpoint + '/add', {name: name, make: make});
    };

  });
