var mongoose = require('mongoose');
var faker = require('faker');
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

// custom method to seed locations about an arbitary location L
LocationSchema.methods.seed = function(callback) {
  var longitude = this.loc.longitude;
  var latitude = this.loc.latitude;

  for (var value of range(10)) {
    this.model('Location').save({
      name: faker.town,
      loc: [faker.longitude(longitude - 10, longitude + 10), faker.latitude(latitude - 10, latitude + 10)]
    });
  }

  return this.model('Location').find(function(err, val) {
    callback(!!val);
  });
};

// export our model location model
var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
