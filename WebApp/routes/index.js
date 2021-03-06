const versionController = require('../controllers/version');
const indexController = require('../controllers/index');
const analyticsController = require('../controllers/analytics');
const deviceController = require('../controllers/device');
const measuresController = require('../controllers/measures');
const bodyParser = require('body-parser');

var express = require('express');
var router = express.Router();
router.use(bodyParser.json());

// GET home page
router.get('/', indexController.get_index);

// GET analytics page
router.get('/analytics', analyticsController.get_analytics);

// GET version
router.get('/version', versionController.get_version);

// GET measures from database
router.post('/measures', measuresController.post_get_measures);

// GET measurements model
router.get('/measures/model', measuresController.get_measurements_model);

// GET list of devices from database
router.get('/device', deviceController.get_devices);

// POST send message to device
router.post('/device/:deviceId', deviceController.post_device_id);

module.exports = router;
