import pickle
import os

# Get the directory of the script up two levels (to get out of api/services.py)
from fastapi import HTTPException

base_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))

# Now append 'model' and the model filename to this base path
model_path = os.path.join(base_path, 'model', 'soil_moisture_model.pkl')


def load_model():
    try:
        with open(model_path, 'rb') as file:
            model = pickle.load(file)
            return model
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


def predict(input_data):
    try:
        model = load_model()
        prediction = model.predict(input_data)
        return prediction
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

