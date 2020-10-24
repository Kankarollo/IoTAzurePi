var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function (req, res) {
    res.render('index');
});

// GET version
router.get('/version', function (req, res) {
    res.send('GET /version');
});

module.exports = router;
