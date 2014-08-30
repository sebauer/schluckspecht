var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BottleTypeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  make: {
    type: String,
    index: true
  },
  name: {
    type: String,
    index: true
  },
  stockCount: {
    type: Number,
    default: 0
  }
});

// Define the unique index for our schema
BottleTypeSchema.index({
  make: 1,
  name: 1
}, {
  unique: true
})

var BottleType = mongoose.model('BottleType', BottleTypeSchema);

module.exports = {
  BottleType: BottleType
}
