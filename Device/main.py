from send_message import send_single_message
from receive_message import receive_cloud_message
from handle_sensor_data import read_data
import asyncio
import RPi.GPIO as GPIO

def setup():
    # ustawienie trybu numeracji pinów
    GPIO.setmode(GPIO.BCM)
    # ustawienie pinów jako OUT
    GPIO.setup(22, GPIO.OUT) # pompka
    GPIO.setup(27, GPIO.OUT) # LED
    # wyłączenie urządzeń
    GPIO.output(22, GPIO.LOW)
    GPIO.output(27, GPIO.LOW)

async def run():
    await asyncio.gather(
        receive_cloud_message(),
        send_single_message(read_data()),
    )

if __name__ == "__main__":
    setup()
    asyncio.run(run())
    GPIO.cleanup()
