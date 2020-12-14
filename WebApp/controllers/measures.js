const iotData = require("../models/iotDataModel");

exports.get_measurements_model = function (req, res) {
    var measurementsModel = []
    data = iotData.measureSchema.IotData;
    for(var attribute in data){
        measurementsModel.push(attribute);
    }
    res.json(measurementsModel);
};

exports.post_get_measures = function (req, res) {
    (async () => {
        let measures = await iotData.dataModel.find(req.body).exec();
        res.json(measures);
    })().catch();
};
