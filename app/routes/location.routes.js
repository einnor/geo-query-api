var express = require('express');
var router = express.Router();

var LocationController = require('../controllers/location.controller');

// GET:/locations
router.get('/locations', LocationController.Index);

// GET:/locations/:id
router.get('/locations/:id', LocationController.Show);

// POST:/locations
router.post('/locations', LocationController.Create);

// POST:/locations/seed
router.post('/locations/seed', LocationController.Seed);

// POST:/locations/geofencing
router.post('/locations/geofencing', LocationController.Geofencing);

// PUT:/locations/:id
router.put('/locations/:id', LocationController.Update);

// DELETE:/locations/:id
router.delete('/locations/:id', LocationController.Delete);

module.exports = router;
