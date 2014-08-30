var mongoose = {};
require('../models/BottleType');

module.exports = {
  setConnection: function(mongoInstance) {
    mongoose = mongoInstance;
  },

  addBottles: function(bottleTypeId, num, callback) {
    if(num <= 0 || isNaN(num)){
      callback(new Error('Must be a valid positive number'));
      return;
    }

    var BottleType = mongoose.model('BottleType');

    // Find bottle type
      BottleType.findByIdAndUpdate(bottleTypeId, {
      $inc: {
        stockCount: num
      }
    }, {
      select: ['stockCount']
    }, function(err, result){
      // Check for error
      if(err) callback(err);
      callback(null, result.stockCount);
    });
  },
  removeBottles: function(bottleTypeId, num){},
  getBottles: function(){},
  getBottlesByType: function(bottleTypeId){},

  addBottleType: function(bottleType){},
  removeBottleType: function(bottleType){},
}
