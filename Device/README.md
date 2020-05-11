# Device

### Sending message to IoT Device
- Install Azure CLI
- Add device connection string to environment variables

        export DEVICE_CONN_STRING='device connection string'
- Add extension: 

        az extension add --name azure-iot
- Send message: 

        az iot device c2d-message send --device-id 'your device id' --hub-name 'your IoT Hub name' --data 'your message here'
