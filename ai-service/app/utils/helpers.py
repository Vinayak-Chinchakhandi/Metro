def get_crowd_level(passengers):

    if passengers < 8000:
        return "Low"

    elif passengers < 14000:
        return "Medium"

    return "High"


def expected_travel_time(distance):

    # metro avg speed ~35 km/h
    return round((distance / 35) * 60, 2)


def fraud_reason(distance, travel_time, repeat_usage):

    expected_time = expected_travel_time(distance)

    if repeat_usage == 1:
        return "Ticket reused multiple times"

    if travel_time < expected_time * 0.3:
        return "Travel time too short for distance"

    if travel_time > expected_time * 3:
        return "Unusually long travel duration"

    return "Normal travel pattern"