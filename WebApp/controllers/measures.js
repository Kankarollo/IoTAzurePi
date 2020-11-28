const iotData = require("../models/iotDataModel");

exports.get_measures = function (req, res) {
    (async () => {
        let measures = await iotData.find({}).exec();
        res.json(measures);
    })().catch();
};
