import os
import asyncio
from azure.iot.device.aio import IoTHubDeviceClient
from azure.iot.device import Message
from handle_sensor_data import generate_data, read_data
from device_configuration import DEVICE_CONN_STR


async def send_single_message(message_body):
    device_client = IoTHubDeviceClient.create_from_connection_string(DEVICE_CONN_STR)

    await device_client.connect()

    message = Message(str(message_body), content_type='application/json')
    await device_client.send_message(message)

    await device_client.disconnect()


if __name__ == "__main__":
    asyncio.run(send_single_message(read_data()))
