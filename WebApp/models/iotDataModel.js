const mongoose = require("mongoose");
const config = require("../utils/config").mongo;

const measureSchema = {
    MessageDate: Date,
    DeviceId: String,
    IotData: {
        humidity: Number,
        temperature: Number,
        light: Number,
        ground: Number,
    },
};

const dataModel = mongoose.model(config.db_collection, measureSchema);

module.exports = {
    dataModel,
    measureSchema
}
