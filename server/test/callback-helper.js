var assert = require('assert');
var callbackHelper = require('../helper/callback-helper');

var logMock = {};
var resMock = {};

describe('callbackHandler', function(){

  beforeEach(function(){
    logMock = {
      'info' : function(){},
      'debug': function(){},
      'warn' : function(){},
      'error': function(){}
    };

    resMock = {
      'send' : function(){},
    }
  });

  describe('handleCallback', function(){
    it('should log an error, when the call failed', function(done){
      logMock.error = function(err){
        assert(err);
        done();
      };
      var cbHandler = new callbackHelper({}, resMock, logMock);
      cbHandler.handleCallback(new Error('Test Error'), {});
    });

    it('should return a HTTP status 500 when the call failed', function(done){
      resMock = {
        'send': function(httpStatus, result){
          assert.equal(httpStatus, 500);
          done();
        },
      }
      var cbHandler = new callbackHelper({}, resMock, logMock);
      cbHandler.handleCallback(new Error('Test Error'), {});
    });

    it('should log an info, when the call succeeded', function(done){
      logMock.info = function(input){
        assert(input);
        done();
      };
      var cbHandler = new callbackHelper({}, resMock, logMock);
      cbHandler.handleCallback(null, {});
    });

    it('should return a HTTP status 200 when the call succeeded', function(done){
      resMock = {
        'send': function(httpStatus, result){
          assert.equal(httpStatus, 200);
          done();
        },
      }
      var cbHandler = new callbackHelper({}, resMock, logMock);
      cbHandler.handleCallback(null, {});
    });

  });
});
