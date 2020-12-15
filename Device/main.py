from send_message import send_single_message
from receive_message import receive_cloud_message
from handle_sensor_data import read_data
from rpi_hardware_interface import setup_RPi, tearDown_RPi
import asyncio
<<<<<<< HEAD
import logging
import datetime
import os

def setup(file_name):
    logging.basicConfig(filename=file_name)
    setup_RPi()   

async def run():
    await asyncio.gather(
        receive_cloud_message(),
        # send_single_message(read_data()),
    )

if __name__ == "__main__":
    log_file = str(datetime.datetime.now())+".log"
    setup(log_file)
    asyncio.run(run())
<<<<<<< HEAD
    logging.shutdown()
    tearDown_RPi()
=======
    GPIO.cleanup()
    logging.shutdown()
>>>>>>> 7d6c5fa4b2ecf49593f218c61ca0551eb3fc4c13
    if os.stat(log_file).st_size == 0 : 
        os.remove(log_file)
