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

  // Post a location into Database
  Create: function(req, res){
    var location = new Location(req.body);
    location.save(function(err, location){
      if(err) {
        res.json({status: false, error: "Something went wrong"});
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
          res.json({status: false, error: "Name was not updated!"});
        }
        res.json({status: true, message: "Name was successfully updated!", location: location});
      });
    });
  },

  // Delete a location baed on an ID
  Delete: function(req, res){
    Location.remove({_id: req.params.id}, function(err, location){
      if(err) {
        res.json({status: false, error: "Location was not deleted!"});
        return;
      }
      res.json({status: true, message: "Location was successfully deleted!!", location: location});
    });
  }
}

module.exports = LocationCtrl;
