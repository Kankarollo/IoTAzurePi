const mongoose = require("mongoose");
const iotHubConnectionString = process.env.IotHubConnectionString;
const eventHubConsumerGroup = process.env.EventHubConsumerGroup;
const mongoDBConnectionString = process.env.MongoDBConnectionString;

if (!iotHubConnectionString) {
    console.error(`Environment variable IotHubConnectionString must be specified.`);
    return;
}
console.log(`Using IoT Hub connection string [${iotHubConnectionString}]`);

if (!eventHubConsumerGroup) {
    console.error(`Environment variable EventHubConsumerGroup must be specified.`);
    return;
}
console.log(`Using event hub consumer group [${eventHubConsumerGroup}]`);

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
    iotHubConnectionString,
    eventHubConsumerGroup,
    mongoDBConnectionString
};
