var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// defining schema for our location model
var LocationSchema = Schema({
  name: {
    type: String,
    default: ''
  },
  loc: {
    type: [Number],   // [<longitude>, <latitude>]
    index: '2d'       // create the geospatial index
  }
});

// export our model location model
var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
