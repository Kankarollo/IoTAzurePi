const config = require("./config").requester;
const iotHubConnectionString = require("./setup.js");

var Client = require('azure-iothub').Client;
var Registry = require('azure-iothub').Registry;
var Message = require('azure-iot-common').Message;


// fetch list of devices from iot hub
var listOfDevices = Registry.fromConnectionString(iotHubConnectionString).list();
var devices = [];

// function requesting data from all iot hub devices
async function requestData(deviceID) {
    let deviceClient = Client.fromConnectionString(iotHubConnectionString);
    deviceClient.open(function (err) {
        if (err) {
            console.error('Could not connect: ' + err.message);
        } else {
            console.log('Client connected');

            setInterval(function () {
                var message = new Message(config.message);
                console.log('Sending message: ' + message.getData() + ' to device: ' + deviceID);
                deviceClient.send(deviceID, message);
            }, config.timeout);
        }
    });
}

(async () => {
    await listOfDevices.then(
        (response) => response.responseBody.forEach(
            (val) => devices.push(val.deviceId))
    );
    devices.forEach(requestData);
})().catch();
