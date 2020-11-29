const iotData = require("../models/iotDataModel");

exports.post_get_measures = function (req, res) {
    bodyFilter = {};
    if (req.body.deviceId != '') {
        bodyFilter = { DeviceId: req.body.deviceId };
    }
    (async () => {
        let measures = await iotData.find(bodyFilter).exec();
        res.json(measures);
    })().catch();
};
