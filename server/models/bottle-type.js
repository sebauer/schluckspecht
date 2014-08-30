var mongoose = require('mongoose');

var BottleTypeSchema = new mongoose.Schema({
  id: {
    type: ObjectId,
    turnOn: true
  }
  make: {
    type: String,
    index: true
  },
  name: {
    type: String,
    index: true
  },
  stockCount: {
    type: Number
  }
});

var BottleType = mongoose.model('BottleType', BottleTypeSchema);

module.exports = {
  BottleType: BottleType
}
