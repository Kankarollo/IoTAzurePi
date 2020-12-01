const iotData = require("../models/iotDataModel");

exports.post_get_measures = function (req, res) {
    (async () => {
        let measures = await iotData.find(req.body).exec();
        res.json(measures);
    })().catch();
};
