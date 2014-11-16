angular.module('schluckspecht.bottleTypeSynchronizer', ['schluckspecht.bottleService'])
  .service('bottleTypeSynchronizer', function($http, $timeout, bottleService) {

    var started = false;
    var _bottleTypes;

    this.synchronize = function(bottleTypes, interval) {
      if (started) {
        return;
      }
      started = true;
      _bottleTypes = bottleTypes;
      schedule(interval);
    };

    var loadBottleTypes = function(delay) {
      bottleService.getBottleTypes().then(function(bottleTypes) {
        // do merge here, also check again for pendingrequests
        merge(bottleTypes, _bottleTypes);
        schedule(delay);
      }, function() {
        schedule(delay);
      });
    };

    var schedule = function(delay) {
      $timeout(function() {
        // only load if pendingRequests = 0
        if (!requestsPending()) {
          console.debug('No pending requests, load bottletypes');
          loadBottleTypes(delay);
        } else {
          console.debug('Requests pending');
          // reschedule
          schedule(delay);
        }

      }, delay);
    };

    var requestsPending = function() {
      return $http.pendingRequests.length !== 0;
    };

    var merge = function(srcBottleTypes, targetBottleTypes) {
      // iterate over srcBottleTypes and check if present in targetBottleTypes, if yes -> update
      for (var i = 0; i < srcBottleTypes.length; i++) {
        var srcBottleType = srcBottleTypes[i];
        var targetBottleType = findBottleType(srcBottleType, targetBottleTypes);
        if (targetBottleType) {
          // merge with existing one
          angular.extend(targetBottleType, srcBottleType);
        } else {
          // new bottle type
          targetBottleTypes.push(srcBottleType);
        }
      }

    };

    var findBottleType = function(bottleType, bottleTypes) {
      for (var i = 0; i < bottleTypes.length; i++) {
        if (bottleType._id === bottleTypes[i]._id) {
          return bottleTypes[i];
        }
      }
      return null;
    };

  });
