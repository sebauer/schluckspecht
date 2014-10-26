angular.module('schluckspecht.bottleServiceRemote', [])
  .service('bottleServiceRemote', function($http) {

    var endpoint = "/service/bottle-service";
    var bottleTypesEndpoint = endpoint + "/bottle-types";
    var bottlesEndpoint = endpoint + "/bottles";

    this.getBottleTypes = function() {
      return $http.get(bottleTypesEndpoint + '/get')
        .then(defaultResponseHandler);
    };

    this.addBottles = function(bottleTypeId, num) {
      return $http.post(
        bottlesEndpoint + '/add',
        {bottleTypeId: bottleTypeId, amount: num}
      ).then(defaultResponseHandler);
    };

    this.addBottleType = function(name, make) {
      return $http.post(
        bottleTypesEndpoint + '/add',
        {name: name, make: make}
      ).then(defaultResponseHandler);
    };

    this.takeBottles = function(bottleTypeId, amount) {
      return $http.post(
        bottlesEndpoint + '/take',
        {bottleTypeId: bottleTypeId, amount: amount}
      ).then(defaultResponseHandler);
    };

    var defaultResponseHandler = function(response) {
      // this will make response.data to be passed to other "thens"
      return response.data;
    };

  });
