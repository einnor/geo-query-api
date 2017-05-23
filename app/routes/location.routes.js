var express = require('express');
var router = express.Router();

var LocationController = require('../controllers/location.controller');

// GET:/locations
router.get('/locations', LocationController.Index);

module.exports = router;
