var mongoose = {};

module.exports = {
  setConnection: function(mongoInstance) {
    mongoose = mongoInstance;
  },

  addBottles: function(bottleTypeId, num, callback) {
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
