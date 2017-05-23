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
}

module.exports = LocationCtrl;
