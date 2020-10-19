from handle_sensor_data import read_data
import RPi.GPIO as GPIO
from send_message import send_single_message
from handle_sensor_data import read_data

def analyze_msg(data):
    if(data == b'lightOn'):
        GPIO.output(27, GPIO.HIGH)
    elif(data == b'lightOff'):
        GPIO.output(27, GPIO.LOW)
    elif(data == b'pumpOn'):
        GPIO.output(22, GPIO.HIGH)
    elif(data == b'pumpOff'):
        GPIO.output(22, GPIO.LOW)
    elif(data == b'readData'):
        send_single_message(read_data())
    else:
        print("Unknow msg")
