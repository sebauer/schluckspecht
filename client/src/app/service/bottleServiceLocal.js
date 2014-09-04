angular.module('schluckspecht.bottleServiceLocal', [])
  .service('bottleServiceLocal', function($q) {

    var warehouse = [
      {id: 0, make: "volvic", name: "wasser still", stockCount: 0},
      {id: 1, make: "Krombacher", name: "Fassbrause", stockCount: 0}
    ];

    this.getBottleTypes = function() {
      var deferred = $q.defer();

      deferred.resolve(angular.copy(warehouse));

      return deferred.promise;
    };

    this.addBottles = function(bottleTypeId, num) {
      var deferred = $q.defer();

      var bottleType;

      for (var i = 0; i < warehouse.length; i++) {
          if (warehouse[i].id === bottleTypeId) {
            bottleType = warehouse[i];
            break;
          }
      }

      if (bottleType) {
        // found
        bottleType.stockCount += num;
        deferred.resolve(bottleType.stockCount);
      } else {
        // not found
        deferred.reject();
      }

      return deferred.promise;
    };

    this.addBottleType = function(name, make) {
    };

  });
