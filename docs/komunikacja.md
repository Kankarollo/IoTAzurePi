Komunikacja
================


## [Wysyłanie wiadomości z IoT Hub do IoT Device](#wysyłanie-wiadomości-z-iot-hub-do-iot-device)

Aby wysłać wiadomość z IoT Hub do IoT Device należy:

 - [Zainstaluj](https://docs.microsoft.com/pl-pl/cli/azure/install-azure-cli?view=azure-cli-latest) Azure CLI
 - Dodaj *connection string* do zmiennych środowiskowych
  
        export DEVICE_CONN_STRING='device connection string

 - Dodaj rozszerzenie
  
        az extension add --name azure-iot


 - Wyślij wiadomość

        az iot device c2d-message send --device-id 'your device id' --hub-name 'your IoT Hub name' --data 'your message here'


----------------
## [Wysyłanie danych z IoT Device do IoT Hub](#wysyłanie-danych-z-iot-device-do-iot-hub)

Prace nad wysyłaniem danych z IoT Device do IoT Hub są przeprowadzane na *branch'u* [*device_develop*](https://github.com/Kankarollo/IoTAzurePi/tree/device_develop).

TODO

--------------------
## [Komunikacja dwustronna IoTHub - IoT Device](#komunikacja-dwustronna-iothub---iot-device)

Demo komunikacji dwustronnej zostało opracowane na *branch'u* [*concurrent_device*](https://github.com/Kankarollo/IoTAzurePi/tree/concurrent_device_work).

Wymagane:

 - python >= 3.6

Uruchomienie:

- Ściągnąć repozytorium

        git clone https://github.com/Kankarollo/IoTAzurePi.git

- Przenieść się na branch komunikacji dwustronnej
  
        git checkout origin\concurrent_device_work

- Zainstalować wymagane biblioteki :

        python -m pip -r requirements.txt

- Ustawić zmienne środowiskowe DEVICE_CONN_STRING. Wartości tych zmiennych są w iot hubie (iot hub/Explorers/IoT devices/nazwa_urządzenia/) i jest to pole Primary Connection String.

        export DEVICE_CONN_STRING='device connection string'

- Uruchom program main.py

        python main.py