var Location = require('../models/location.model');

var LocationCtrl = {

  // Get all locations from the Database
  Index: function(req, res){
    Location.find({}, function(err, locations){
      if(err) {
        res.json({status: false, error: err.message});
        return;
      }
      res.json({status: true, location: locations});
    });
  },

  // Get location by id from the Database
  Show: function(req, res){
    Location.findOne({_id: req.params.id}, function(err, location){
      if(err) {
        res.json({status: false, error: err.message});
        return;
      }
      res.json({status: true, location: location});
    });
  },

  // Post a location into Database
  Create: function(req, res){
    var location = new Location(req.body);
    location.save(function(err, location){
      if(err) {
        res.json({status: false, error: err.message});
        return;
      }
      res.json({status: true, message: "Location successfully saved!", location: location});
    });
  },

  // Update a location name based on an ID
  Update: function(req, res){
    var name = req.body.name;
    Location.findById(req.params.id, function(err, location){
      location.name = name;
      location.save(function(err, location){
        if(err) {
          res.json({status: false, error: err.message});
        }
        res.json({status: true, message: "Name was successfully updated!", location: location});
      });
    });
  },

  // Delete a location baed on an ID
  Delete: function(req, res){
    Location.remove({_id: req.params.id}, function(err, location){
      if(err) {
        res.json({status: false, error: err.message});
        return;
      }
      res.json({status: true, message: "Location was successfully deleted!"});
    });
  },

  // Seed random locations in the DB
  Seed: function(req, res){
    var coords = [req.body.longitude || 0, req.body.latitude || 0]; // if longitude and/or latitude is undefined, set to 0
    var location = new Location({
      name: '',
      loc: coords
    });
    location.seed(function(err, locations){
      if(err) {
        res.json({status: false, error: err.message});
        return;
      }
      res.json({status: true, message: "Location database successfully seeded with 100 documents!", location: locations});
    });
  },

  // Geofencing, takes in user's coordiantes L and radius R
  Geofencing: function(req, res) {
    var radius_km = parseFloat(req.body.radius) || 8; // set radius to 8km if undefined
    radius = radius_km / 6371; // convert distance to radians. the radius of Earth is approximately 6371km
    var coords = [parseFloat(req.body.longitude) || 0, parseFloat(req.body.latitude) || 0]; // if longitude and/or latitude is undefined, set to 0

    // find nearest locations to user's coordinates L
    Location.find({
      loc: {
        $near: coords,
        $maxDistance: radius
      }
    }, function(err, locations) {
      if (err) {
        res.json({status: false, error: err.message});
        return;
      }
      res.json({status: true, message: "Results of locations within " + radius_km + "km of [" + req.body.longitude + "," + req.body.latitude + "]", location: locations});
    });
  },

  // Geofencing, takes in user's coordiantes L and radius R
  GeofilteringRectangle: function(req, res) {
    var width_km = parseFloat(req.body.width) || 10; // set width to 10km if undefined
    var length_km = parseFloat(req.body.length) || 15; // set height to 15km if undefined

    // convert distance to radians. the radius of Earth is approximately 6371km
    width = width_km / 6371;
    length = length_km / 6371;
    var longitude = parseFloat(req.body.longitude) || 0;
    var latitude = parseFloat(req.body.latitude) || 0;
    var coords = [longitude, latitude]; // if longitude and/or latitude is undefined, set to 0

    // The rectangle coordinates
    var topLeft = [longitude - length/2, latitude + width/2];
    var topRight = [longitude + length/2, latitude + width/2];
    var bottomRight = [longitude + length/2, latitude - width/2];
    var bottomLeft = [longitude - length/2, latitude - width/2];
    var rectangleCoordinates = [
      topLeft, topRight, bottomRight, bottomLeft, topLeft
    ];

    // find nearest locations to user's coordinates L
    Location.find({
      loc: {
        $geoWithin: {
          $geometry: {
             type : "Polygon",
             coordinates: [rectangleCoordinates]
          }
        }
      }
    }, function(err, locations) {
      if (err) {
        res.json({status: false, error: err.message});
        return;
      }
      res.json({status: true, message: "Results of locations within rectangular region of length " + length_km + "km and width " + width_km + "km of [" + longitude + "," + latitude + "]", location: locations});
    });
  }
}

module.exports = LocationCtrl;
