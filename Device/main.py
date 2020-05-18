from send_message import send_single_message
from receive_message import receive_cloud_message
from handle_sensor_data import generate_data
import asyncio


async def run():
    await asyncio.gather(
        receive_cloud_message(),
        send_single_message(generate_data()),
    )

if __name__ == "__main__":
    asyncio.run(run())
