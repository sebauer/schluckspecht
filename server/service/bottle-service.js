var connection = {};

module.exports = {
  setConnection: function(mongoInstance) {
    connection = mongoInstance;
  },

  addBottles: function(bottleType, num) {

  },
  removeBottles: function(bottleType, num){},
  getBottles: function(){},
  getBottlesByType: function(bottleType){},

  addBottleType: function(bottleType){},
  removeBottleType: function(bottleType){},
}
