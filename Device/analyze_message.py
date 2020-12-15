from send_message import send_single_message
from handle_sensor_data import  generate_data
# from handle_sensor_data import  read_data
import logging
# from rpi_hardware_interface import setPWM


async def analyze_msg(data):
    if(data == b'lightPWM'):
        print("Setting PWM")
        setPWM(50)
    elif(data == b'pumpOn'):
        print("Turning pumpON")
        # GPIO.output(22, GPIO.HIGH)
    elif(data == b'pumpOff'):
        print("Turning pumpOFF")
        # GPIO.output(22, GPIO.LOW)
    elif(data == b'readData'):
        # await send_single_message(read_data())
        await send_single_message(generate_data())
    else:
        logging.info("-I- Received unknow msg")