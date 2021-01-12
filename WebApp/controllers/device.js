const sendMessage = require('../utils/helpers').sendMessage;
const iotData = require("../models/iotDataModel").dataModel;

exports.post_device_id = function (req, res) {
    sendMessage(JSON.stringify(req.body.message), req.params.deviceId);
};

exports.get_devices = function (req, res) {
    (async () => {
        await iotData.find().distinct('DeviceId', function (err, results) {
            res.json(results);
        });
    })().catch();
};
