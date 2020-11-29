from handle_sensor_data import read_data
import RPi.GPIO as GPIO
from send_message import send_single_message
from handle_sensor_data import read_data
import logging
from rpi_hardware_interface import setPWM


def analyze_msg(data):
    if(data == b'lightPWM'):
        setPWM(50)
    elif(data == b'pumpOn'):
        GPIO.output(22, GPIO.HIGH)
    elif(data == b'pumpOff'):
        GPIO.output(22, GPIO.LOW)
    elif(data == b'readData'):
        send_single_message(read_data())
    else:
        logging.info("-I- Received unknow msg")