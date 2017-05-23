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
LocationSchema.methods.seed = function(cb) {
  var longitude = this.loc[0];
  var latitude = this.loc[1];

  for (var i = 0; i < 100; i++) {
    location = new Location({
      name: faker.address.streetName(),
      loc: [faker.finance.amount(longitude - 5, longitude + 5, 4), faker.finance.amount(latitude - 5, latitude + 5, 4)]
    });
    location.save();
  }

  return Location.find({}, cb);
};

// export our model location model
var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
