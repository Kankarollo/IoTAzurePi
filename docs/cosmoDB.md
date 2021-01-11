CosmoDB
==============

## [Opis](#opis) ##

W celu zapisania danych do późniejszej analizy, w projekcie zastosowaliśmy usługę Azure Cosmos DB, która używa bazy danych mongoDB.

Funkcje Azure Cosmos DB:

- Gwarantowana szybkość na jakąkolwiek skalę
- Uproszczony rozwój aplikacji
- Ciągłość i bezawaryjność 
- W pełni zarządzalny i opłacalny


**Koszty:**

Aplikacja Azure Cosmos DB w swojej darmowej odsłonie pozwala na użycie 400 RU/s oraz 5 GB magazynu. 

## [Stworzenie nowego środowiska](#stworzenie-nowego-środowiska)

Do obsługi naszej aplikacji należy wyłącznie stworzyć nowe środowisko w panelu Azure Cosmos DB. Panel jest bardzo przejrzysty i jedyne na co musimy uważać to jaką subskrypcję wybieramy. 

Po utworzeniu panelu, skopiuj ze strony MongoDBConnectionString i zdefiniuj tak jak jest to opisane w rozdziale "Od czego zacząć?" dokumentacji.