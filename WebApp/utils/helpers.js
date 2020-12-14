const iotHubConnectionString = require('./setup.js').iotHubConnectionString;
var Message = require('azure-iot-common').Message;
var Client = require('azure-iothub').Client;

function sendMessage(messageContent, receiverID) {
    let client = Client.fromConnectionString(iotHubConnectionString);

    client.open(function (err) {
        if (err) {
            console.error('Could not connect: ' + err.message);
        } else {
            console.log('Client connected');

            let message = new Message(messageContent);
            console.log('Message content: ' + messageContent);
            console.log('Message receiver: ' + receiverID);
            client.send(receiverID, message);
        }
    });
}

module.exports = { sendMessage };
