from mongoengine import *
from configuration import MONGO_DB_NAME, MONGO_DB_HOST, MONGO_DB_PORT

connect(db=MONGO_DB_NAME, host=MONGO_DB_HOST, port=MONGO_DB_PORT)


class Measurement(Document):
    temperature = FloatField(required=True)
    humidity = FloatField(required=True)
