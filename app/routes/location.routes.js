var express = require('express');
var router = express.Router();

var LocationController = require('../controllers/location.controller');

/**
 * @api {get} /api/locations List all locations
 * @apiGroup Locations
 * @apiSuccess {Boolean} status Response status
 * @apiSuccess {Object[]} location Response location
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      status: true,
 *      location:
 *      [{
 *          "_id": "592472ac8e2ea598d1d82aba",
 *          name: "Ruaka Town",
 *          loc: [26.418, 14.9706]
 *      }]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *   {
 *      status: false,
 *      error: err.message
 *    }
 */
router.get('/locations', LocationController.Index);

/**
 * @api {get} /api/locations/:id Find a location
 * @apiGroup Locations
 * @apiParam {id} id Location id
 * @apiSuccess {Boolean} status Response status
 * @apiSuccess {Object} location Response location
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      status: true,
 *      location:
 *      {
 *          _id: "592472ac8e2ea598d1d82aba",
 *          name: "Ruaka Town",
 *          loc: [26.418, 14.9706]
 *      }
 *    }
 * @apiErrorExample {json} Location not found
 *    HTTP/1.1 200 OK
 *   {
 *      status: true,
 *      location: null
 *    }
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 *   {
 *      status: false,
 *      error: err.message
 *    }
 */
router.get('/locations/:id', LocationController.Show);

/**
 * @api {post} /api/locations Register a new location
 * @apiGroup Locations
 * @apiParam {String} name Location name
 * @apiParam {Number} longitude Location longitude
 * @apiParam {Number} latitude Location latitude
 * @apiParamExample {json} Input
 *    {
 *      "name": "Ruaka Town",
 *      "longitude": "26.418",
 *      "latitude": "14.9706"
 *    }
 * @apiSuccess {Boolean} status Response status
 * @apiSuccess {Message} message Response message
 * @apiSuccess {Object} location Response location
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      status: true,
 *      message: "Location was successfully saved!!",
 *      location:
 *      {
 *          _id: "592472ac8e2ea598d1d82aba",
 *          name: "Ruaka Town",
 *          loc: [26.418, 14.9706]
 *      }
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *   {
 *      status: false,
 *      error: err.message
 *    }
 */
router.post('/locations', LocationController.Create);

/**
 * @api {post} /api/locations/seed Seed locations
 * @apiGroup Locations
 * @apiParam {Number} longitude Location longitude
 * @apiParam {Number} latitude Location latitude
 * @apiParamExample {json} Input
 *    {
 *      "longitude": "26.418",
 *      "latitude": "14.9706"
 *    }
 * @apiSuccess {Boolean} status Response status
 * @apiSuccess {Message} message Response message
 * @apiSuccess {Object[]} location Response location
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      status: true,
 *      message: "Location database successfully seeded with 100 documents!",
 *      location:
 *      [
 *        {
 *          _id: "592472ac8e2ea598d1d82aba",
 *          name: "Ruaka Town",
 *          loc: [26.418, 14.9706]
 *        },
 *        .
 *        .
 *        .
 *      ]
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *   {
 *      status: false,
 *      error: err.message
 *    }
 */
router.post('/locations/seed', LocationController.Seed);

/**
 * @api {post} /api/locations/geofencing Geofencing
 * @apiGroup Locations
 * @apiParam {Number} longitude Location longitude
 * @apiParam {Number} latitude Location latitude
 * @apiParam {Number} radius in km
 * @apiParamExample {json} Input
 *    {
 *      "longitude": "26.418",
 *      "latitude": "14.9706",
 *      "radius": "8"
 *    }
 * @apiSuccess {Boolean} status Response status
 * @apiSuccess {Message} message Response message
 * @apiSuccess {Object[]} location Response location
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      status: true,
 *      message: "Results of locations within 8km of [26.418,14.9706]",
 *      location:
 *      [
 *        {
 *          _id: "592472ac8e2ea598d1d82aba",
 *          name: "Ruaka Town",
 *          loc: [26.418, 14.9706]
 *        },
 *        .
 *        .
 *        .
 *      ]
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *   {
 *      status: false,
 *      error: err.message
 *    }
 */
router.post('/locations/geofencing', LocationController.Geofencing);

// POST:/locations/geofiltering/rectangle
/**
 * @api {post} /api/locations/geofiltering/rectangle Geofiltering Rectangle
 * @apiGroup Locations
 * @apiParam {Number} longitude Location longitude
 * @apiParam {Number} latitude Location latitude
 * @apiParam {Number} length in km
 * @apiParam {Number} width in km
 * @apiParamExample {json} Input
 *    {
 *      "longitude": "26.418",
 *      "latitude": "14.9706",
 *      "length": "15"
 *      "width": "10"
 *    }
 * @apiSuccess {Boolean} status Response status
 * @apiSuccess {Message} message Response message
 * @apiSuccess {Object[]} location Response location
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      status: true,
 *      message: "Results of locations within rectangular region of length 15km and width 10km of [26.418,14.9706]",
 *      location:
 *      [
 *        {
 *          _id: "592472ac8e2ea598d1d82aba",
 *          name: "Ruaka Town",
 *          loc: [26.418, 14.9706]
 *        },
 *        .
 *        .
 *        .
 *      ]
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 *   {
 *      status: false,
 *      error: err.message
 *    }
 */
router.post('/locations/geofiltering/rectangle', LocationController.GeofilteringRectangle);

router.post('/locations/geofiltering/polygon', LocationController.GeofilteringPolygon);

/**
 * @api {put} /api/locations/:id Update a location
 * @apiGroup Locations
 * @apiParam {id} id Location id
 * @apiParam {String} name Location name
 * @apiParamExample {json} Input
 *    {
 *      "name": "Ruaka Town"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      status: true,
 *      message: "Location was successfully updated!!",
 *      location:
 *      {
 *          _id: "592472ac8e2ea598d1d82aba",
 *          name: "Ruaka Town",
 *          loc: [26.418, 14.9706]
 *      }
 *    }
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 *   {
 *      status: false,
 *      error: err.message
 *    }
 */
router.put('/locations/:id', LocationController.Update);

/**
 * @api {delete} /api/locations/:id Remove a location
 * @apiGroup Locations
 * @apiParam {id} id Location id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      status: true,
 *      message: "Location was successfully deleted!!"
 *    }
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      status: false,
 *      error: err.message
 *    }
 */
router.delete('/locations/:id', LocationController.Delete);

module.exports = router;
