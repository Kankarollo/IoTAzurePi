import os
import asyncio
from azure.iot.device.aio import IoTHubDeviceClient
from azure.iot.device import Message
from handle_sensor_data import generate_data
# from handle_sensor_data import read_data
from config import DEVICE_CONN_STRING
import json


async def send_single_message(message_body):
    device_client = IoTHubDeviceClient.create_from_connection_string(DEVICE_CONN_STRING)
    await device_client.connect()

    message = Message(json.dumps(message_body), content_type='application/json')
    await device_client.send_message(message)

    await device_client.disconnect()

if __name__ == "__main__":
    # jesli nie ma sie podlaczonego rpi to zmienic na generate_data
    # asyncio.run(send_single_message(read_data()))
    asyncio.run(send_single_message(generate_data()))
