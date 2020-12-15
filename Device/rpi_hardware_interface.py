import logging
import RPi.GPIO as GPIO


pwm = None


def setup_RPi():
    global pwm
    # RPi Setup
    # ustawienie trybu numeracji pinow
    GPIO.setmode(GPIO.BCM)
    # ustawienie pinow jako OUT
    try:
        GPIO.setup(22, GPIO.OUT) # pompka
        GPIO.output(22, GPIO.LOW)
    except:
        logging.warning("-W- GPIO 22 (Pump) is already in use")
    try:
        GPIO.setup(13, GPIO.OUT) # LED
        GPIO.output(13, GPIO.LOW)
        pwm = GPIO.PWM(13, 1000)
        pwm.start(0) 
    except:
        logging.warning("-W- GPIO 27 (LED) is already in use")


def tearDown_RPi():
    global pwm
    pwm.stop()
    GPIO.cleanup()


def setPWM(_pwm):
    global pwm
    pwm.ChangeDutyCycle(_pwm)
