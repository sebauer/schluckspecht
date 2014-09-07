var mongoose = {};
var BottleType = require('../models/BottleType').model;

module.exports = {
  setConnection: function(mongoInstance) {
    mongoose = mongoInstance;
  },

  /**
   * Add bottles to the stock of the given BottleType.
   *
   * Returns the new stock value
   */
  addBottles: function(bottleTypeId, num, callback) {
    if(num <= 0 || isNaN(num)){
      callback(new Error('Must be a valid positive number'));
      return;
    }
    //var BottleType = mongoose.model('BottleType');

    // Find bottle type
    BottleType.findByIdAndUpdate(bottleTypeId, {
      $inc: {
        stockCount: num
      }
    }, {
      select: ['stockCount']
    }, function(err, result){
      // Check for error
      if(err) {
        callback(err);
        return;
      }
      callback(null, result.stockCount);
    });
  },

  /**
   * Takes bottles from the stock of the given BottleType.
   *
   * Returns the new stock value
   */
  takeBottles: function(bottleTypeId, num, callback){
    if(num <= 0 || isNaN(num)){
      callback(new Error('Must be a valid positive number'));
      return;
    }
    //var BottleType = mongoose.model('BottleType');

    // Find bottle type
    BottleType.findByIdAndUpdate(bottleTypeId, {
      $inc: {
        stockCount: -num
      }
    }, {
      select: ['stockCount']
    }, function(err, result){
      // Check for error
      if(err) {
        callback(err);
        return;
      }
      callback(null, result.stockCount);
    });
  },

  getBottleTypes: function(callback){
    //var BottleType = mongoose.model('BottleType', );

    BottleType.find({}, callback);
  },

  getBottlesByTypeId: function(bottleTypeId){},


  /**
   * Add a new BottleType to the system
   *
   * Returns the Model of the newly added BottleType
   */
  addBottleType: function(make, name, callback){
    if(make == '' || name == '') {
      callback(new Error('"make" and "name" cannot be empty'));
      return;
    }

    //var BottleType = mongoose.model('BottleType');
    BottleType.create({
      'make': make,
      'name': name
    }, function(err, model) {
      if(err){
        callback(err);
      } else {
        callback(null, model);
      }
    });
  },

  removeBottleType: function(bottleType){},
}
