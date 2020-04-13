import os

MONGO_DB_NAME = str(os.getenv('MONGO_DB_NAME', 'iot-azure-pi-db'))
MONGO_DB_HOST = str(os.getenv('MONGO_DB_HOST', 'localhost'))
MONGO_DB_PORT = int(os.getenv('MONGO_DB_PORT', '27017'))

EVENT_HUB_CONN_STR = str(os.getenv('EVENT_HUB_CONN_STR'))
EVENT_HUB_NAME = str(os.getenv('EVENT_HUB_NAME'))
