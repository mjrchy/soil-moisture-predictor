def transform_adc_to_resistance(adc_value, R_ref, V_ref=1.1, adc_max=4095):
    if adc_value == 0:
        return float('inf')  # Avoid division by zero, return infinite resistance
    elif adc_value == adc_max:
        return 0.0  # If ADC value is at maximum, no voltage drop across the sensor

    V_A = (adc_value / float(adc_max)) * V_ref
    Rs = (V_ref - V_A) * R_ref / V_A  # Using the voltage divider formula Rs = (V_ref - V_A) / V_A * R_ref

    return Rs

# Usage
R_ref = 10000  # Reference resistor value in ohms (change this based on your actual setup)
adc_value = 2048  # Example ADC reading
resistance = transform_adc_to_resistance(adc_value, R_ref)
print(f'Resistance: {resistance} ohms')