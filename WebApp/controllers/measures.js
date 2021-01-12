const iotData = require("../models/iotDataModel").dataModel;
const iotDataSchema = require("../models/iotDataModel").measureSchema;

exports.get_measurements_model = function (req, res) {
    var measurementsModel = []
    data = iotDataSchema.IotData;
    for (var attribute in data) {
        measurementsModel.push(attribute);
    }
    res.json(measurementsModel);
};

exports.post_get_measures = function (req, res) {
    (async () => {
        let measures = await iotData.find(req.body).exec();
        res.json(measures);
    })().catch();
};
