'''
DHT11 sensor - read data
'''
import random
import sys
import smbus
import Adafruit_DHT


def generate_data():
    return {"temperature": random.random(), "humidity": random.random(), "temperatureAlert": "false"}

def read_data():
    humidity, temperature = read_data_DHT11()
    light = read_data_GY30()
    if humidity is not None and temperature is not None and light is not None:
        # print('Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(temperature, humidity))
        return {"temperature": temperature, "humidity": humidity,
        "light": light}
    else:
        return {}

def read_data_DHT11():

    # Try to grab a sensor reading.  Use the read_retry method which will retry up
    # to 15 times to get a sensor reading (waiting 2 seconds between each retry).
    # 11 stand for DHT-11 and 17 stands for GPIO pin
    humidity, temperature = Adafruit_DHT.read_retry(11, 17)
    # print('Temp={0:0.1f}*  Humidity={1:0.1f}%'.format(temperature, humidity))
    return temperature, humidity

def convert_GY30_to_Number(data):
  # Simple function to convert 2 bytes of data
  # into a decimal number.
  result=(data[1] + (256 * data[0])) / 1.2
  return (result)

def read_data_GY30():
    bus = smbus.SMBus(1)  # Rev 2 Pi uses 1
    # 0x23 is an addres of device, 0x20 is measurement at 1lx resolution. 
    # Time typically 120ms
    # Device is automatically set to Power Down after measurement.
    data = bus.read_i2c_block_data(0x23,0x20)
    return convert_GY30_to_Number(data)
