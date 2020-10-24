const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const EventHubReader = require('./utils/ms_scripts/event-hub-reader.js');
const iotData = require("./models/iotDataModel");
const { iotHubConnectionString, eventHubConsumerGroup, mongoDBConnectionString } = require("./utils/setup.js");
const config = require("./utils/config").app;
const dataRequester = require("./utils/dataRequester.js");

var indexRouter = require("./routes/index");

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

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

server.listen(config.port, () => {
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
