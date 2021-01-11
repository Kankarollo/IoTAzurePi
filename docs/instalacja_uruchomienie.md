Od czego zacząć?
================

## [Instalacja](#instalacja)

Do zainstalowania systemu potrzebujemy wcześniej:

- Konto na platformie microsoft Azure a na nim:
    - Panel IoT Hub (Sprawdź rozdział Azure)
    - Panel cosmoDB (Sprawdź rozdział CosmoDB)
- Urządzenie IoT z zainstalowanym pythonem3 (w przypadku braku takiego urządzenia sprawdź sekcje [Symulacja urządzenia](#symulacja-urządzenia).)

### Aplikacja webowa

Przed uruchomieniem aplikacji należy ustawić 2 zmienne środowiskowe pozwalające na komunikację ze środowiskiem chmurowym Azure:

* _IotHubConnectionString_ - łańcuch znaków identyfikujący usługę IoTHub
* _EventHubConsumerGroup_ - nazwa identyfikująca usługę EventHub, w przypadku IoT Hub jest to domyślnie "$Default"

W przypadku gdy chcemy zapisywać otrzymane dane do bazy danych należy ustawić zmienną środowiskową:

* _MongoDBConnectionString_ - łańcuch znaków identyfikujący bazę danych MongoDB (może to być zarówno lokalna baza danych jak i umieszczona w chmurze np. Azure CosmosDB).

Aplikacja może zostać skonfigurowana poprzez edycję pliku konfiguracyjnego `config.js`, który znajduje się w folderze `utils`. Dostępne opcje konfiguracyjne:

* mongo.db_name - nazwa bazy danych, w której przechowywane są dane archiwalne
* mongo.db_collection - nazwa kolekcji
* app.port - port, na który wystawiana jest aplikacja
* requester.timeout - częstotliwość z jaką aplikacja wysyła zapytania o dane (podawana w milisekundach)
* requester.message - treść wiadomości wysyłanej przez aplikację w danym odstępie czasowym

### Urządzenie IoT

Przed uruchomieniem danego urządzenia IoT należy zdefiniować zmienną środowiskową:

       export DEVICE_CONN_STRING='Primary Connection String'

----------------
## [Jak uruchomić?](#jak-uruchomić)

### Aplikacja webowa

Pobierz repozytorium za pomocą narzędzia git:

        git clone https://github.com/Kankarollo/IoTAzurePi.git

Przejdź do folderu aplikacji:

        cd WebApp

Przed uruchomieniem należy zainstalować wszystkie zależności wymagane przez aplikację należy przejść do folderu, gdzie znajduje się plik _packages.json_  i użyć komendy:

      npm install

Po instalacji, uruchamiamy aplikację za pomocą komendy:

      npm start

### Urządzenie IoT

Pobierz repozytorium za pomocą narzędzia git:

        git clone https://github.com/Kankarollo/IoTAzurePi.git

Przejdź do folderu Device:

        cd Device

Przed instalacją należy zainstalować wszystkie potrzebne biblioteki do prawidłowego działania systemu. Wejdź do folderu Device i uruchom instalację z pomocą komendy:

      python3 -m pip install -r requirements.txt

Potem wystarczy uruchomić program komendą:

      python3 main.py

## [Symulacja urządzenia](#symulacja-urządzenia)

W przypadku braku wcześniej przygotowanego urządzenia IoT, uruchom program symulacyjny, który będzie wysyłał losowe dane do panelu administracyjnego.

Tak samo jak prawdziwe urządzenie należy je wcześniej zadeklarować w Azure IoT Hub.

Pobierz repozytorium za pomocą narzędzia git:

        git clone https://github.com/Kankarollo/IoTAzurePi.git

Przejdź na branch mock_device

        git checkout mock_device

Przejdź do folderu Device:

        cd Device

Przed instalacją należy zainstalować wszystkie potrzebne biblioteki do prawidłowego działania systemu. Wejdź do folderu Device i uruchom instalację z pomocą komendy:

      python3 -m pip install -r requirements.txt

Potem wystarczy uruchomić program komendą:

      python3 main.py

## [Co dalej?](#co-dalej)

Przejdź do rozdziału Panel Administracyjny by dowiedzieć się więcej o funkcjach dostępnych po uruchomieniu aplikacji.