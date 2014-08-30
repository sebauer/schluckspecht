require('../models/BottleType');

var assert = require('assert');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var bottleService = require('../service/bottle-service');

describe('bottleService', function(){

var BottleType = mongoose.model('BottleType');

  // Set up test models
  beforeEach(function(done){
      mockgoose.reset();
      BottleType.create({
        make: 'Tegernseer',
        name: 'Pils Hell',
        stockCount: 0
      }, function(err, model) {
        done(err);
      });
  });

  describe('addBottles', function() {
    it('should return the new number of bottles on stock');
    it('should increase the number of bottles of the given type by the number of bottles which have been added');
    it('should fail if the number of added bottles is negative');
  });

  afterEach(function(done){
    mockgoose.reset();
    done();
  });
});
