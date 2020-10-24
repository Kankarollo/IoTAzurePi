const config = require('./config').requester;
const sendMessage = require('./helpers').sendMessage;
const iotHubConnectionString = require('./setup.js').iotHubConnectionString;

var Client = require('azure-iothub').Client;
var Registry = require('azure-iothub').Registry;

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
                sendMessage(deviceClient, config.message, deviceID)
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
