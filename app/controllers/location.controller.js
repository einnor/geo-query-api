var Location = require('../models/location.model');

var LocationCtrl = {

  // Get all locations from the Database
  Index: function(req, res){
    Location.find({}, function(err, locations){
      if(err) {
        res.json({status: false, error: "Something went wrong"});
        return;
      }
      res.json({status: true, location: locations});
    });
  },

  // Get location by id from the Database
  Show: function(req, res){
    Location.findOne({_id: req.params.id}, function(err, location){
      if(err) {
        res.json({status: false, error: "Something went wrong"});
        return;
      }
      res.json({status: true, location: location});
    });
  },

  // Post a todo into Database
  Create: function(req, res){
    var location = new Location(req.body);
    location.save(function(err, location){
      if(err) {
        res.json({status: false, error: "Something went wrong"});
        return;
      }
      res.json({status: true, message: "Location successfully saved!", location: location});
    });
  }
}

module.exports = LocationCtrl;
