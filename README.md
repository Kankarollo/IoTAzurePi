# IoTAzurePi

Check full documentation - [https://www.hackster.io/105122/smart-plant-iot-59cbc3](https://www.hackster.io/105122/smart-plant-iot-59cbc3)

## 2@KSDE'2020 Rozproszony system monitoringu zrealizowany w oparciu o chmurę i internet rzeczy 

Celem projektu jest opracowanie rozproszonego systemu monitorowania,
zrealizowanego korzystając z chmury (AWS, Azure), oraz koncepcji
internetu rzeczy. W ramach projektu należy przygotować urządzenia
pomiarowe / monitorujące na bazie komputerów Raspberry Pi, które
umożliwią zbieranie oraz przesyłanie danych do platformy
administracyjnej / nadzorującej zrealizowanej na bazie dostępnych
rozwiązań chmurowych (IoT Core, IoT Hub). System musi umożliwiać zarówna
odbieranie wiadomości z urządzeń pomiarowych i przetwarzanie ich na
platformie chmurowej, jak i wysyłanie wiadomości (na przykład danych
konfiguracyjnych) z panelu administracyjnego w chmurze do urządzeń
pomiarowych. Dodatkowo panel administracyjny powinien umożliwiać
przeprowadzenia analiz na danych pomiarowych.

## Idea na zastosowanie ##
[Inspiracja.](https://www.hackster.io/105122/smart-plant-iot-59cbc3) 

IoT ogród. Poprzez aplikację Azure WebApp użytkownik mógłby zarządzać swoimi roślinami oraz obserwować dane wysyłane z czujników (temperatura, wilgotność pomieszczenia, wilgotność gleby, natężenie światła) za pomocą prostego GUI. Znajdowałyby się tam odpowiednie funkcję:
- Wizualizacja danych otrzymanych z czujników
- Możliwość podlania rośliny za pomocą wysłania wiadomości sterującej do raspberryPi, która uruchomi pompkę z wodą
- Przechowywanie danych w bazie danych CosmoDB

![Schemat projektu](doc/media/Schemat.png)
