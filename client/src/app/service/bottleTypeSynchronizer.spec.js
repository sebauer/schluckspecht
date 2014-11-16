describe('BottleTypeSynchronizer', function() {
  var $timeout;
  var $httpBackend;
  var $http;
  var bottleService;
  var bottleTypeSynchronizer;
  var bottleTypes;

  beforeEach(module('schluckspecht.bottleTypeSynchronizer', 'schluckspecht.bottleService'));

  beforeEach(inject(function(_$timeout_, _$httpBackend_, _$http_, _bottleService_, _bottleTypeSynchronizer_) {
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    $http = _$http_;
    bottleService = _bottleService_;
    bottleTypeSynchronizer = _bottleTypeSynchronizer_;

    bottleTypes = [
      {_id: 0, make: 'Warsteiner', name: 'Radler', stockCount: 4},
      {_id: 1, make: 'Warsteiner', name: 'Pils', stockCount: 3}
    ];

  }));

  it("should update existing bottleTypes and add new bottleTypes", function() {
    var bottleTypesResponse = [
      {_id: 0, make: 'Warsteiner', name: 'Radler', stockCount: 4},
      {_id: 1, make: 'Warsteiner', name: 'Pils', stockCount: 2},
      {_id: 2, make: 'Volvic', name: 'Still', stockCount: 2}
    ];

    $httpBackend.expectGET('/service/bottle-service/bottle-types/get').respond(200, bottleTypesResponse);
    // start synchronizer
    bottleTypeSynchronizer.synchronize(bottleTypes, 5000);

    // flush timeouts (will trigger all timeout functions)
    $timeout.flush();
    $httpBackend.flush();

    expect(bottleTypes).toEqual(bottleTypesResponse);
    expect(bottleTypes).not.toBe(bottleTypesResponse);

    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should do nothing if there is a pending request", function() {
    // simulate pending request
    $http.pendingRequests = [1, 1];

    // start synchronizer
    bottleTypeSynchronizer.synchronize(bottleTypes, 5000);

    // flush timeouts (will trigger all timeout functions)
    $timeout.flush();

    // no request is done!
  });

});
