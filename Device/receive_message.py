import os
import asyncio
from six.moves import input
import threading
from azure.iot.device.aio import IoTHubDeviceClient
from config import DEVICE_CONN_STRING


async def receive_cloud_message():
    device_client = IoTHubDeviceClient.create_from_connection_string(DEVICE_CONN_STRING)

    await device_client.connect()

    async def message_listener(device_client):
        while True:
            message = await device_client.receive_message()
            print("the data in the message received was ")
            print(message.data)

    def stdin_listener():
        while True:
            selection = input("Press Q to quit\n")
            if selection == "Q" or selection == "q":
                print("Quitting...")
                break

    asyncio.create_task(message_listener(device_client))

    loop = asyncio.get_running_loop()
    user_finished = loop.run_in_executor(None, stdin_listener)

    await user_finished

    await device_client.disconnect()
