const mongoose = require("mongoose");

const targetDevice = process.env.IotHubDeviceID;

const iotHubConnectionString = process.env.IotHubConnectionString;
if (!iotHubConnectionString) {
    console.error(`Environment variable IotHubConnectionString must be specified.`);
    return;
}
console.log(`Using IoT Hub connection string [${iotHubConnectionString}]`);

const eventHubConsumerGroup = process.env.EventHubConsumerGroup;
if (!eventHubConsumerGroup) {
    console.error(`Environment variable EventHubConsumerGroup must be specified.`);
    return;
}
console.log(`Using event hub consumer group [${eventHubConsumerGroup}]`);

const mongoDBConnectionString = process.env.MongoDBConnectionString;
if (mongoDBConnectionString) {
    mongoose.connect(mongoDBConnectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    const connection = mongoose.connection;
    connection.once("open", function () {
        console.log("MongoDB database connection established successfully");
    });
}

module.exports = {
    targetDevice,
    iotHubConnectionString,
    eventHubConsumerGroup,
    mongoDBConnectionString
};
