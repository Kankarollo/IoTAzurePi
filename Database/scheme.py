from mongoengine import *
from configuration import MONGO_DB_NAME, MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_CS

if MONGO_DB_CS != '':
    connect(db=MONGO_DB_NAME, host=MONGO_DB_CS)
else:
    connect(db=MONGO_DB_NAME, host=MONGO_DB_HOST, port=MONGO_DB_PORT)


class Measurement(Document):
    temperature = FloatField(required=True)
    humidity = FloatField(required=True)
