require('../models/BottleType');

var assert = require('assert');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var bottleService = require('../service/bottle-service');
bottleService.setConnection(mongoose);

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
    
    it('should return the new number of bottles on stock', function(done){
      BottleType.findOne({
        name: 'Pils Hell',
        make: 'Tegernseer'
      }, function(err, tegernseer){
        if(err) done(err);
        assert.equal(bottleService.addBottles(tegernseer, 10), 10);
      });
    });

    it('should increase the number of bottles of the given type by the number of bottles which have been added');
    it('should fail if the number of added bottles is negative');
  });

  afterEach(function(done){
    mockgoose.reset();
    done();
  });
});
