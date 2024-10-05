import tensorflow as tf
tf.config.run_functions_eagerly(True)

model = load_model("route_prediction_model.h5")
def generate_route(from_location, to_location, intermediate_locations):
    from_encoded = location_encoder.transform([from_location])
    to_encoded = location_encoder.transform([to_location])
    
    X_input = np.array([[from_encoded[0], to_encoded[0]]])
    
    prediction = model.predict(X_input)
    predicted_index = np.argmax(prediction)
    
    predicted_location = location_encoder.inverse_transform([predicted_index])[0]
    
    if predicted_location in intermediate_locations:
        return predicted_location
    else:
        return "No suitable intermediate location found from the user's request."