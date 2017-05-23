var express = require('express');
var router = express.Router();

var LocationController = require('../controllers/location.controller');

// GET:/locations
router.get('/locations', LocationController.Index);

// GET:/locations/:id
router.get('/locations/:id', LocationController.Show);

// POST:/locations
router.post('/locations', LocationController.Create);

// PUT:/locations/:id
router.put('/locations/:id', LocationController.Update);

module.exports = router;
