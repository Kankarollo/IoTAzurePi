'''
Mock sensor - random float values generate
'''
import random


def generate_data():
    return {"temperature": random.random(), "humidity": random.random()}
