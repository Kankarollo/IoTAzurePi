from Database import scheme


def save_measurement_to_database(data):
    data_object = scheme.Measurement(temperature=data['temperature'], humidity=data['humidity'])
    data_object.save()
