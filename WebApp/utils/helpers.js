var Message = require('azure-iot-common').Message;

function sendMessage(client, messageContent, receiverID) {
    var message = new Message(messageContent);
    console.log('Message content: ' + messageContent);
    console.log('Message receiver: ' + receiverID);
    client.send(receiverID, message);
}

module.exports = { sendMessage };
