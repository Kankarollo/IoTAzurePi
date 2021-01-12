Struktura aplikacji
================


## [Konfiguracja i uruchamianie aplikacji](#konfiguracja-i-uruchamianie-aplikacji)

### Lokalna

Przed uruchomieniem aplikacji należy ustawić 2 zmienne środowiskowe pozwalające na komunikację ze środowiskiem chmurowym Azure:

* _IotHubConnectionString_ - łańcuch znaków identyfikujący usługę IoTHub
* _EventHubConsumerGroup_ - nazwa identyfikująca usługę EventHub, w przypadku IoT Hub jest to domyślnie "$Default"

W przypadku gdy chcemy zapisywać otrzymane dane do bazy danych należy ustawić zmienną środowiskową:

* _MongoDBConnectionString_ - łańcuch znaków identyfikujący bazę danych MongoDB (może to być zarówno lokalna baza danych jak i umieszczona w chmurze np. Azure CosmosDB).

Aby zainstalować wszystkie zależności wymagane przez aplikację należy przejść do folderu, gdzie znajduje się plik _packages.json_  i użyć komendy: `npm install`

Aplikacja może zostać skonfigurowana poprzez edycję pliku konfiguracyjnego `config.js`, który znajduje się w folderze `utils`. Dostępne opcje konfiguracyjne:

* mongo.db_name - nazwa bazy danych, w której przechowywane są dane archiwalne
* mongo.db_collection - nazwa kolekcji
* app.port - port, na który wystawiana jest aplikacja
* requester.timeout - częstotliwość z jaką aplikacja wysyła zapytania o dane (podawana w milisekundach)
* requester.message - treść wiadomości wysyłanej przez aplikację w danym odstępie czasowym

Aby uruchomić aplikację należy użyć komendy: `npm start`

### Azure App Service

`UWAGA`
`Usługa Azure App Service musi być umieszczona na maszynie z systemem operacyjnym Windows`

Zmienne środowiskowe pozwalające na połączenie z usługą Azure Iot Hub należy ustawić w zakładce `Settings/Configuration/Application Settings`.

W zakładce `Settings/Configuration/General Settings` należy zezwolić na użycie "Web sockets". Pozwoli to na odczytywanie danych w czasie rzeczywistym.


## [Backend aplikacji](#backend-aplikacji)

Aplikacja została napisana w NodeJS, przy wykorzystaniu frameworka express.js (ver 4.17.1). Wymagane wersje:

* npm >= 6.0.0
* node >= 10.6

Aplikacja udostępnia następujące endpointy GET:

* / - główna strona dashboardu
* /analytics - strona, pozwalająca na przeglądanie danych z bazy danych
* /version - zwraca wersję aplikacji (GET)
* /measures/model - zwraca wszystkie rodzaje pomiarów (temperatura, wilgotność etc...) GET
* /device - zwraca listę wszystkich urządzeń z bazy danych (GET)

Aplikacja udostępnia następujące endpointy POST:

* /measures - zwraca pomiary z bazy danych według podanego filtru (POST)

Struktura zapytania:

{
    DeviceId: Array,
    MessageDate:{
        $gte: ISOString,
        $lte: ISOString
    }
}


* /device/:deviceId - wysyła wiadomość do danego urządzenia (POST) (deviceId jest to ID urządzenia)

Struktura zapytania:


{
    message: String
}


Do przekazywania danych telemetrii w czasie rzeczywistym z serwera do klienta wykorzstywany jest protokół WebSocket. Dane są zapisywane do bazy danych MongoDB z wykorzystaniem modułu mongoose, zgodnie z następującym modelem:


{
    MessageDate: ISOString,
    DeviceId: String,
    IotData: {
        humidity: Double,
        temperature: Double,
        light: Double,
        ground: Double,
    },
}


## [Frontend aplikacji](#frontend-aplikacji)


Frontend aplikacji został napisany bez użycia nowoczesnych frameworków. Użyty został czysty HTML wraz z plikami typu .js.
Używamy bibliotek takich jak jQuery czy bootstrap do łatwiejszej pracy.

Pliki dotyczące samej strony znajdują się w folderze WebApp/public. Strona składa się z dwóch stron i tak też znajdziemy tam 2 pliki html, wraz z 2 plikami js do ich obsługi. Struktura strony frontendowej aplikacji:

/public
- index.html                          #Strona główna aplikacji.
- analytics.html                      #Strona analityczna aplikacji
- /js
    - frontendController.js         #Plik javascript zarządzający stroną główną
    - analyticsController.js        #Plik javascript zarządzający stroną analityczną

Frontend komunikuję się ze stroną serwerową (backendem) za pomocą WebSocketów. Przyjmowane są wiadomości o następującej strukturze:

        
{
    MessageDate: ISOString,
    DeviceId: String,
    IotData: {
        humidity: Double,
        temperature: Double,
        light: Double,
        ground: Double,
    },
}
        

Po otrzymaniu następującego komunikatu aplikacja aktualizuje swoje dane i wyświetla je wraz z pomocą modułu Chart.js