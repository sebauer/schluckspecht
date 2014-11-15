angular.module('schluckspecht.bottleTypeDisplay', [
  'schluckspecht.bottleService'
])

.directive("bottleTypeDisplay", function() {
  return {
    scope: {
      bottleType: '='
    },
    restrict: 'E',
    replace: true,
    templateUrl: 'directives/bottleTypeDisplay.tpl.html',
    controller: ['$scope', 'bottleService', function($scope, bottleService) {
      var bottleType = $scope.bottleType;

      $scope.addBottles = function(num) {
        bottleService.addBottles(bottleType._id, Number(num)).then(function(data) {
          bottleType.stockCount = data.stockCount;
          $scope.num = null;
        }, function() {
          alert("fail!");
        });
      };

      $scope.takeBottle = function() {
        bottleService.takeBottles(bottleType._id, 1).then(function(data) {
          bottleType.stockCount = data.stockCount;
        });
      };

    }]
  };
})

;
