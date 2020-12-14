CosmoDB
==============

## [Opis](#opis) ##

W celu zapisania danych do późniejszej analizy, w projekcie zastosowaliśmy usługę Azure Cosmos DB, która używa bazy danych mongoDB.

---------------
## [Wersja testowa](#wersja-testowa) ##

W celu testowym został stworzony skrypt napisany w języku python, który wyświetla odebrane z IoT Hub'a dane i przekierowuje je do bazy danych Azure Cosmos DB.

Wymagane:
 - Wersja python >= 3.6
 - Posiadanie instancji [IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-create-through-portal)
 - Posiadanie instancji [Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/create-sql-api-python) 

Uruchomienie:

- Ściągnąć repozytorium

        git clone https://github.com/Kankarollo/IoTAzurePi.git

- Przenieść się na branch komunikacji dwustronnej
  
        git checkout origin\managing_storage

- Zainstalować wymagane biblioteki :

        python -m pip -r requirements.txt

- Ustawić zmienne środowiskowe
  - DEVICE_CONN_STRING - Znajdziemy je w (iot hub/Explorers/IoT devices/nazwa_urządzenia/) i jest to pole Primary Connection String.
  - EVENT_HUB_NAME, EVENT_HUB_CONN_STR - Wartości tych zmiennych są w iot hubie (iot hub/settings/built-in endpoints) i są to kolejno Event Hub-compatible endpoint, Event Hub-compatible name.
  - MONGO_DB_CS - azure comsos DB account/Settings/Connection String/ Pole **Primary Connection String**

        export DEVICE_CONN_STRING='device connection string'
        export EVENT_HUB_NAME='event hub name'
        export EVENT_HUB_CONN_STR='event hub connection string'
        export MONGO_DB_CS='device connection string'

- Uruchom program main.py

        python main.py
