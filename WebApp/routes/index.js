const versionController = require('../controllers/version');
const indexController = require('../controllers/index');
const deviceController = require('../controllers/device');
const bodyParser = require('body-parser');

var express = require('express');
var router = express.Router();
router.use(bodyParser.json());

// GET home page
router.get('/', indexController.get_index);

// GET version
router.get('/version', versionController.get_version);

// POST device/deviceID
router.post('/device/:deviceId', deviceController.post_device_id);

module.exports = router;
