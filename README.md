# IoTAzurePi

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
Pomysł jest na stworzenie rozproszonego systemu kontroli roślinek. Mamy kilka roślinek w kilku miejscach i do kazdego jest podłączona Raspberka z czujnikami wilgotności i temperatury i z pompką z wodą. Za pomocą systemu opartego na Azurze można będzie wizualizować dane, analizować czy jest lepiej u roślinki czy gorzej i sterować pompką z wodą.
