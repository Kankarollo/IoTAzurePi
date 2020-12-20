import json
import RPi.GPIO as GPIO
from send_message import send_single_message
from handle_sensor_data import  generate_data,read_data
import logging
from rpi_hardware_interface import setPWM
import time



async def analyze_msg(data):
    command, command_value = parse_message(data)
    if(command == "lightPWM"):
        print(f"Setting PWM to {command_value}")
        setPWM(int(command_value))
    elif(command == "pumpOn"):
        GPIO.output(22, GPIO.HIGH)
        time.sleep(3)
        GPIO.output(22, GPIO.LOW)
    elif(command == "readData"):
        await send_single_message(read_data())
        # await send_single_message(generate_data())
    else:
        logging.info("-I- Received unknow msg")

def parse_message(message):
    data = str(bytes.decode(message))
    message = data.strip("\"")
    message = message.split(":")
    command = command_value = ""
    if(len(message) == 2):
        command, command_value = message[0], message[1]
    else:
        command = message[0]
    print(f"command = {command}")
    return command, command_value