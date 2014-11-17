var BottleType = require('../models/BottleType').BottleType;

var assert = require('assert');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var bottleService = require('../service/bottle-service');
bottleService.setConnection(mongoose);

describe('bottleService', function(){

  var BottleType = mongoose.model('BottleType');
  var initialStockCount = 15;

  // Set up test models
  beforeEach(function(done){
      mockgoose.reset();
      BottleType.create({
        make: 'Tegernseer',
        name: 'Pils Hell',
        stockCount: initialStockCount
      }, function(err, model) {
        done(err);
      });
  });

  describe('bottleTypes', function(){

    describe('getBottleTypes', function(){
      beforeEach(function(done){
        mockgoose.reset();
        BottleType.create([
          {
            make: 'Rothaus',
            name: 'Tannenzäpfle'
          }, {
            make: 'Tegernseer',
            name: 'Pils',
            stockCount: initialStockCount
          }, {
            make: 'Volvic',
            name: 'Natürliches Mineralwasser',
            stockCount: 0
          }
        ], function(err, model) {
          done(err);
        });
      });

      it('should return a list of all existing bottle types', function(done){
        bottleService.getBottleTypes(function(err, result){
          assert.equal(result.length, 3);
          done();
        });
      });

      it('should return all required fields for bottle types', function(done){
        bottleService.getBottleTypes(function(err, result){
          for(var i in result){
            assert(result[i].make);
            assert(result[i].name);
            assert.equal('stockCount' in result[i], true);
          }
          done();
        });
      });
    });

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

    describe('takeBottles', function(){
      it('should return the new number of bottles on stock, when successful', function(done){
        BottleType.findOne({
          name: 'Pils Hell',
          make: 'Tegernseer'
        }, function(err, tegernseer){
          if(err) done(err);
          else {
            bottleService.takeBottles(tegernseer._id, 5, function(err, newValue){
              if(err) done(err);
              assert.equal(newValue.stockCount, initialStockCount-5);
              done();
            });
          }
        });
      });

      it('should fail if the number of taken bottles is negative', function(done){
        BottleType.findOne({
          name: 'Pils Hell',
          make: 'Tegernseer'
        }, function(err, tegernseer){
          if(err) done(err);
          bottleService.takeBottles(tegernseer._id, -10, function(callbackError, newValue){
            if(callbackError) done();
            else {
              done(new Error('No error raised'));
            }
          });
        });
      });

      it('should fail if no valid number is given', function(done){
        BottleType.findOne({
          name: 'Pils Hell',
          make: 'Tegernseer'
        }, function(err, tegernseer){
          if(err) done(err);
          bottleService.takeBottles(tegernseer._id, 'foobar', function(err, newValue){
            if(err) done();
            else {
              done(new Error('No error raised'));
            }
          });
        });
      });

      it('return the number 0 when the stock is empty', function(done){
        BottleType.findOne({
          name: 'Pils Hell',
          make: 'Tegernseer'
        }, function(err, tegernseer){
          if(err) done(err);
          else {
            bottleService.takeBottles(tegernseer._id, 15, function(err, newValue){
              if(err) done(err);
              assert.equal(newValue.stockCount, 0);
              done();
            });
          }
        });
      });

      it('throw an error when the number of bottles taken is greater than the current stock', function(done){
        BottleType.findOne({
          name: 'Pils Hell',
          make: 'Tegernseer'
        }, function(err, tegernseer){
          if(err) done(err);
          else {
            bottleService.takeBottles(tegernseer._id, 17, function(err, newValue){
              if(err) done();
              else {
                done(new Error('No error raised'));
              }
            });
          }
        });
      });

    });

    describe('addBottles', function() {

      it('should return the new number of bottles on stock, when successful', function(done){
        BottleType.findOne({
          name: 'Pils Hell',
          make: 'Tegernseer'
        }, function(err, tegernseer){
          if(err) done(err);
          else {
            bottleService.addBottles(tegernseer._id, 10, function(err, newValue){
              if(err) done(err);
              assert.equal(newValue.stockCount, initialStockCount+10);
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
