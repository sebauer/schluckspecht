var parseArgs = require('minimist');
var mockgoose = require('mockgoose');

var mockDBArgName = "mock-db";

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

module.exports = {
  mockDBIfNecessary: function(db, args) {
    var mockDBEnabled = containsAndTrue(args, mockDBArgName);
    if (mockDBEnabled) {
      db.isMocked = true;
      mockDB(db);
    } else {
      db.isMocked = false;
    }
  }
};
