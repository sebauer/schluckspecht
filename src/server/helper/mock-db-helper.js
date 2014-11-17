var parseArgs = require('minimist');
var mockgoose = require('mockgoose');

var mockDBArgName = "mock-db";
var BottleType = require('../models/BottleType').model;

var containsAndTrue = function(args, argName) {
  var args = parseArgs(args);
  if (args[argName]) {
    return true;
  }
  return false;
};

var mockDB = function(mongoose) {
  mockgoose(mongoose);
};

var prefillDb = function(){
  BottleType.create([
    {
      make: 'Rothaus',
      name: 'Tannenzäpfle'
    }, {
      make: 'Tegernseer',
      name: 'Pils',
      stockCount: 15
    }, {
      make: 'Volvic',
      name: 'Natürliches Mineralwasser',
      stockCount: 0
    }
  ]);
}

module.exports = {
  mockDBIfNecessary: function(db, args) {
    var mockDBEnabled = containsAndTrue(args, mockDBArgName);
    if (mockDBEnabled) {
      db.isMocked = true;
      mockDB(db);
      prefillDb();
    } else {
      db.isMocked = false;
    }
  }
};
