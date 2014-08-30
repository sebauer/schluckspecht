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

  describe('bottleTypes', function(){


    describe('addBottleTypes', function(){


      it('should return the newly added bottle type', function(done){

        bottleService.addBottleType('Rothaus', 'Tannenzäpfle', function(err, result){
          if(err) {
            done(err);
            return;
          }
          assert.equal(result.make, 'Rothaus');
          assert.equal(result.name, 'Tannenzäpfle');
          assert.equal(result.stockCount, 0);
          assert.ok(result._id)
          done();
        });

      });

      it('should throw an error if make or name are missing', function(done){

        bottleService.addBottleType('Rothaus', '', function(err, result){
          if(err) {
            bottleService.addBottleType('', 'Tannenzäpfle', function(err, result){
              if(err) done();
              else {
                assert.fail('NO Error raised', 'Error raised', 'No error raised for empty make');
              }
            });
          } else {
            assert.fail('NO Error raised', 'Error raised', 'No error raised for empty name');
          }
        });

      });

      it('should not allow adding an existing bottle type with an already existing make/name combination', function(done){
        bottleService.addBottleType('Tegernseer', 'Pils Hell', function(err, result){
          assert.ifError(err);
          done();
        });
      });


      it('should succeed when adding a new type with an already existing make', function(done){
        bottleService.addBottleType('Tegernseer', 'Weizen', function(err, result){
          if(err) {
            done(err);
            return;
          }
          assert.equal(result.make, 'Tegernseer');
          assert.equal(result.name, 'Weizen');
          assert.equal(result.stockCount, 0);
          assert.ok(result._id)
          done();
        });
      });

    });
  });


  describe('bottles', function(){

    describe('addBottles', function() {

      it('should return the new number of bottles on stock', function(done){
        BottleType.findOne({
          name: 'Pils Hell',
          make: 'Tegernseer'
        }, function(err, tegernseer){
          if(err) done(err);
          else {
            bottleService.addBottles(tegernseer._id, 10, function(err, newValue){
              if(err) done(err);
              assert.equal(newValue, 10);
              done();
            });
          }
        });
      });


      it('should fail if the number of added bottles is negative', function(done){
        BottleType.findOne({
          name: 'Pils Hell',
          make: 'Tegernseer'
        }, function(err, tegernseer){
          if(err) done(err);
          bottleService.addBottles(tegernseer._id, -10, function(callbackError, newValue){
            if(callbackError) done();
            else {
              done(new Error('No error raised'));
            }
          });
        });
      });

      it('should fail no valid number is given', function(done){
        BottleType.findOne({
          name: 'Pils Hell',
          make: 'Tegernseer'
        }, function(err, tegernseer){
          if(err) done(err);
          bottleService.addBottles(tegernseer._id, 'foobar', function(err, newValue){
            if(err) done();
            else {
              done(new Error('No error raised'));
            }
          });
        });
      });
    });
  });

  afterEach(function(done){
    mockgoose.reset();
    done();
  });
});
