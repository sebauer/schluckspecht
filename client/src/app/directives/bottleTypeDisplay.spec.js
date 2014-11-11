describe('BottleTypeDisplay', function() {

  var $compile;
  var $rootScope;
  var $scope; // this will be the bottleTypeDisplayScope
  var $httpBackend;
  var bottleService;
  var element; // will be the directives root element

  beforeEach(module('schluckspecht.bottleTypeDisplay', 'schluckspecht.bottleService', 'templates-app'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _bottleService_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    bottleService = _bottleService_;
  }));

  beforeEach(function() {
    // prepare scope
    $rootScope.bottleType = {"_id":"544ba4895ec9bd78156b8600","make":"Warsteiner","name":"Radler","__v":0,"stockCount": 0};
    // compile element
    element = angular.element('<bottle-type-display bottle-type="bottleType"></bottle-type-display>');

    $compile(element)($rootScope.$new());

    $rootScope.$digest();

    // .scope() returns the original scope, not the isolated scope which the directive creates
    $scope = element.isolateScope();
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Controller', function() {

    it("should have an addBottles function, which adds new bottles", function() {

      expect($scope.addBottles).toBeDefined();
      expect($scope.bottleType.stockCount).toBe(0);

      $httpBackend.expectPOST('/service/bottle-service/bottles/add',
        {bottleTypeId: $scope.bottleType._id, amount: 10}).respond(200, 10);

      $scope.addBottles(10);

      $httpBackend.flush();

      expect($scope.bottleType.stockCount).toBe(10);
    });

    it("should have an takeBottle function, which takes one bottle", function() {

      expect($scope.takeBottle).toBeDefined();
      // add some bottles locally
      $scope.bottleType.stockCount = 8;

      $httpBackend.expectPOST('/service/bottle-service/bottles/take',
        {bottleTypeId: $scope.bottleType._id, amount: 1}).respond(200, 7);

      $scope.takeBottle($scope.bottleType._id);

      $httpBackend.flush();

      expect($scope.bottleType.stockCount).toBe(7);
    });

  });




});
