angular.module('schluckspecht.bottleService', ['schluckspecht.bottleServiceRemote', 'schluckspecht.bottleServiceLocal'])
  .factory('bottleService', function(bottleServiceRemote, bottleServiceLocal) {
    // TODO: logic, which returns bottleService Implementation based on window variable
    if ('development' === window.environment) {
      return bottleServiceLocal;
    }

    return bottleServiceRemote;
  });
