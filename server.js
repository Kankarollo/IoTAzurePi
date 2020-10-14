const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const EventHubReader = require('./scripts/event-hub-reader.js');
const mongoose = require("mongoose");
const iotData = require("./models/iotDataModel");

const iotHubConnectionString = process.env.IotHubConnectionString;
if (!iotHubConnectionString) {
  console.error(`Environment variable IotHubConnectionString must be specified.`);
  return;
}
console.log(`Using IoT Hub connection string [${iotHubConnectionString}]`);

const eventHubConsumerGroup = process.env.EventHubConsumerGroup;
console.log(eventHubConsumerGroup);
if (!eventHubConsumerGroup) {
  console.error(`Environment variable EventHubConsumerGroup must be specified.`);
  return;
}
console.log(`Using event hub consumer group [${eventHubConsumerGroup}]`);

const mongoDBConnectionString = process.env.MongoDBConnectionString;
if (mongoDBConnectionString) {
  mongoose.connect(mongoDBConnectionString, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
  const connection = mongoose.connection;
  connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  });
}

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
  res.redirect('/');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log(`Broadcasting data ${data}`);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(process.env.PORT || '3000', () => {
  console.log('Listening on %d.', server.address().port);
});

const eventHubReader = new EventHubReader(iotHubConnectionString, eventHubConsumerGroup);

(async () => {
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      // set received data
      const receivedData = new iotData({
        IotData: message,
        MessageDate: date || Date.now().toISOString(),
        DeviceId: deviceId,
      });

      // send data to all scripts through web sockets
      wss.broadcast(JSON.stringify(receivedData));

      // save received data to mongoDB if there is connection to database
      if (mongoDBConnectionString) {
        receivedData.save().then(result => {
          console.log("Data saved succesfully!");
        });
      }
    } catch (err) {
      console.error('Error broadcasting: [%s] from [%s].', err, message);
    }
  });
})().catch();
