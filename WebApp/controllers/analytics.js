const dataRequester = require("../utils/dataRequester");

exports.get_analytics = function (req, res) {
    // res.render('analytics');
    res.sendFile('analytics.html', {
        root: 'public'
    });
};

exports.get_devices = function(req, res){
    devices = JSON.stringify(dataRequester.devices);
    res.json(devices);
}