var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
const { targetDevice, iotHubConnectionString } = require("./setup.js");
console.log(targetDevice);
var client = Client.fromConnectionString(iotHubConnectionString);

client.open(function (err) {
    if (err) {
        console.error('Could not connect: ' + err.message);
    } else {
        console.log('Client connected');

        setInterval(function () {
            var data = "readData";
            var message = new Message(data);
            console.log('Sending message: ' + message.getData());
            client.send(targetDevice, message);
        }, 1000);
    }
});
