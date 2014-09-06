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
      $scope.num = 0;

      $scope.addBottles = function(num) {
        bottleService.addBottles(bottleType._id, Number(num)).then(function(newStockCount) {
          bottleType.stockCount = newStockCount;
        }, function() {
          alert("fail!");
        });
      };

    }]
  };
})

;
