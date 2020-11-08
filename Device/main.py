from send_message import send_single_message
from receive_message import receive_cloud_message
from handle_sensor_data import read_data
import asyncio
import RPi.GPIO as GPIO
import logging
import datetime
import os


def setup(file_name):
    logging.basicConfig(filename=file_name)
    # RPi Setup
    # ustawienie trybu numeracji pinów
    GPIO.setmode(GPIO.BCM)
    # ustawienie pinów jako OUT
    try:
        GPIO.setup(22, GPIO.OUT) # pompka
        GPIO.output(22, GPIO.LOW)
    except:
        logging.warning("-W- GPIO 22 (Pump) is already in use")
    try:
        GPIO.setup(27, GPIO.OUT) # LED
        GPIO.output(27, GPIO.LOW)
    except:
        logging.warning("-W- GPIO 27 (LED) is already in use")
    
    

async def run():
    await asyncio.gather(
        receive_cloud_message(),
        # send_single_message(read_data()),
    )

if __name__ == "__main__":
    log_file = str(datetime.datetime.now())+".log"
    setup(log_file)
    asyncio.run(run())
    GPIO.cleanup()
    logging.shutdown()
    if os.stat(log_file).st_size == 0 : 
        os.remove(log_file)
