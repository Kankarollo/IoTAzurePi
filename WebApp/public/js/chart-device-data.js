/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
$(document).ready(() => {
  // if deployed to a site supporting SSL, use wss://
  const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
  const webSocket = new WebSocket(protocol + location.host);

  // A class for holding the last N points of telemetry for a device
  class DeviceData {
    constructor(deviceId) {
      this.deviceId = deviceId;
      this.maxLen = 50;
      this.timeData = new Array(this.maxLen);
      this.temperatureData = new Array(this.maxLen);
      this.humidityData = new Array(this.maxLen);
      this.lightData = new Array(this.maxLen);
      this.groundData = new Array(this.maxLen);
    }

    addData(time, temperature, humidity, light, ground) {
      this.timeData.push(time);
      this.temperatureData.push(temperature);
      this.humidityData.push(humidity);
      this.lightData.push(light);
      this.groundData.push(ground);

      if (this.timeData.length > this.maxLen) {
        this.timeData.shift();
        this.temperatureData.shift();
        this.humidityData.shift();
        this.lightData.shift();
        this.groundData.shift();
      }
    }
  }

  // All the devices in the list (those that have been sending telemetry)
  class TrackedDevices {
    constructor() {
      this.devices = [];
    }

    // Find a device based on its Id
    findDevice(deviceId) {
      for (let i = 0; i < this.devices.length; ++i) {
        if (this.devices[i].deviceId === deviceId) {
          return this.devices[i];
        }
      }

      return undefined;
    }

    getDevicesCount() {
      return this.devices.length;
    }
  }

  const trackedDevices = new TrackedDevices();

  // Define the charts axes
  const chartData = [
    {
      datasets: [
        {
          fill: false,
          label: 'Temperature',
          yAxisID: 'Temperature',
          borderColor: 'rgba(255, 204, 0, 1)',
          pointBoarderColor: 'rgba(255, 204, 0, 1)',
          backgroundColor: 'rgba(255, 204, 0, 0.4)',
          pointHoverBackgroundColor: 'rgba(255, 204, 0, 1)',
          pointHoverBorderColor: 'rgba(255, 204, 0, 1)',
          spanGaps: true,
        }
      ]
    },
    {
      datasets: [
        {
          fill: false,
          label: 'Humidity',
          yAxisID: 'Humidity',
          borderColor: 'rgba(24, 120, 240, 1)',
          pointBoarderColor: 'rgba(24, 120, 240, 1)',
          backgroundColor: 'rgba(24, 120, 240, 0.4)',
          pointHoverBackgroundColor: 'rgba(24, 120, 240, 1)',
          pointHoverBorderColor: 'rgba(24, 120, 240, 1)',
          spanGaps: true,
        }
      ]
    },
    {
      datasets: [
        {
          fill: false,
          label: 'Light',
          yAxisID: 'Light',
          borderColor: 'rgba(25, 204, 0, 1)',
          pointBoarderColor: 'rgba(25, 204, 0, 1)',
          backgroundColor: 'rgba(25, 204, 0, 0.4)',
          pointHoverBackgroundColor: 'rgba(25, 204, 0, 1)',
          pointHoverBorderColor: 'rgba(25, 204, 0, 1)',
          spanGaps: true,
        }
      ]
    },
    {
      datasets: [
        {
          fill: false,
          label: 'Ground',
          yAxisID: 'Ground',
          borderColor: 'rgba(210,105,30, 1)',
          pointBoarderColor: 'rgba(210,105,30, 1)',
          backgroundColor: 'rgba(210,105,30, 0.4)',
          pointHoverBackgroundColor: 'rgba(210,105,30, 1)',
          pointHoverBorderColor: 'rgba(210,105,30, 1)',
          spanGaps: true,
        }
      ]
    }
  ];

  const chartOptions = [
    {
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temperature (ºC)',
          display: true,
        },
        position: 'left',
        }]
      }
    },
    {
    scales: {
      yAxes: [{
        id: 'Humidity',
        type: 'linear',
        scaleLabel: {
          labelString: 'Humidity (%)',
          display: true,
        },
        position: 'left',
        }]
      }
    },
    {
    scales: {
      yAxes: [{
        id: 'Light',
        type: 'linear',
        scaleLabel: {
          labelString: 'Light (lux)',
          display: true,
        },
        position: 'left',
        }]
      }
    },
    {
    scales: {
      yAxes: [{
        id: 'Ground',
        type: 'linear',
        scaleLabel: {
          labelString: 'Ground (%)',
          display: true,
        },
        position: 'left',
        }]
      }
    }];

  // Get the contexts of the canvas elements we want to select
  const ctx = [
    document.getElementById('temperatureChart').getContext('2d'), 
    document.getElementById('humidityChart').getContext('2d'), 
    document.getElementById('lightChart').getContext('2d'), 
    document.getElementById('groundChart').getContext('2d')
  ];

  myCharts = new Array(chartData.length);

  function createChart(index) {
    myCharts[index] = new Chart(
      ctx[index],
      {
        type: 'line',
        data: chartData[index],
        options: chartOptions[index],
      });
  }

  for(var i = 0; i < myCharts.length; i++){
    createChart(i);
  }

  function updateCharts() {
    for(var i = 0; i < myCharts.length; i++){
      myCharts[i].update();
    }
  }

  // Manage a list of devices in the UI, and update which device data the chart is showing
  // based on selection
  let needsAutoSelect = true;
  const deviceCount = document.getElementById('deviceCount');
  const listOfDevices = document.getElementById('listOfDevices');

  var currentDeviceID = '';

  const lightOnButton = document.getElementById('lightOnButton');
  const lightOffButton = document.getElementById('lightOffButton');
  const pumpOnButton = document.getElementById('pumpOnButton');
  const pumpOffButton = document.getElementById('pumpOffButton');

  function postMessage(message) {
    fetch('/device/' + currentDeviceID, {method: 'POST', body: JSON.stringify({message: message}), headers: { "Content-Type": "application/json" }})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  
  function OnSelectionChange() {
    const device = trackedDevices.findDevice(listOfDevices[listOfDevices.selectedIndex].text);
    currentDeviceID = listOfDevices[listOfDevices.selectedIndex].text;
    chartData[0].labels = device.timeData;
    chartData[0].datasets[0].data = device.temperatureData;
    chartData[1].labels = device.timeData;
    chartData[1].datasets[0].data = device.humidityData;
    chartData[2].labels = device.timeData;
    chartData[2].datasets[0].data = device.lightData;
    chartData[3].labels = device.timeData;
    chartData[3].datasets[0].data = device.groundData;
    updateCharts();
  }
  listOfDevices.addEventListener('change', OnSelectionChange, false);

  // When a web socket message arrives:
  // 1. Unpack it
  // 2. Validate it has date/time and temperature
  // 3. Find or create a cached device to hold the telemetry data
  // 4. Append the telemetry data
  // 5. Update the chart UI
  webSocket.onmessage = function onMessage(message) {
    try {
      const messageData = JSON.parse(message.data);
      console.log(messageData);

      // time and either temperature or humidity are required
      if (!messageData.MessageDate || (!messageData.IotData.temperature && !messageData.IotData.humidity && !messageData.IotData.light && !messageData.IotData.ground)) {
        return;
      }

      // find or add device to list of tracked devices
      const existingDeviceData = trackedDevices.findDevice(messageData.DeviceId);

      if (existingDeviceData) {
        existingDeviceData.addData(messageData.MessageDate, messageData.IotData.temperature, messageData.IotData.humidity, messageData.IotData.light, messageData.IotData.ground);
      } else {
        const newDeviceData = new DeviceData(messageData.DeviceId);
        trackedDevices.devices.push(newDeviceData);
        const numDevices = trackedDevices.getDevicesCount();
        deviceCount.innerText = numDevices === 1 ? `${numDevices} device` : `${numDevices} devices`;
        newDeviceData.addData(messageData.MessageDate, messageData.IotData.temperature, messageData.IotData.humidity, messageData.IotData.light, messageData.IotData.ground);

        // add device to the UI list
        const node = document.createElement('option');
        const nodeText = document.createTextNode(messageData.DeviceId);
        node.appendChild(nodeText);
        listOfDevices.appendChild(node);

        // if this is the first device being discovered, auto-select it
        if (needsAutoSelect) {
          needsAutoSelect = false;
          listOfDevices.selectedIndex = 0;
          OnSelectionChange();
        }
      }

      updateCharts();
    } catch (err) {
      console.error(err);
    }
  };
});
