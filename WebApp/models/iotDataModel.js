const mongoose = require("mongoose");
const config = require("../utils/config").mongo;

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

module.exports = mongoose.model(config.db_collection, measureSchema);
