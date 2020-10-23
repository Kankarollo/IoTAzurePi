const mongoose = require("mongoose");
const config = require("../utils/config");

let measureSchema = {
    MessageDate: Date,
    DeviceId: String,
    IotData: {
        humidity: Number,
        temperature: Number,
        light: Number,
        ground: Number,
    },
};

module.exports = mongoose.model(config.mongo.db_collection, measureSchema);
