import pandas as pd
import os
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
import joblib

# Load the model (training part moved outside the main function)
model = None
encoder = None

def train_model():
    global model, encoder

    # Load dataset
    file_path = r"C:\Users\ponsa\Desktop\Python\indian_transportation_costs_data_clear.csv"
    data = pd.read_csv(file_path)

    # Separate features and target variable
    X = data[['Distance_km', 'Fuel_Price_per_liter', 'Truck_Capacity_Tons', 'Driver_Experience_Years', 'Truck_Type', 'Cargo_Type', 'Weather']]
    y = data['Amount']

    # One-hot encode categorical features
    encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
    X_encoded = pd.DataFrame(encoder.fit_transform(X[['Cargo_Type', 'Weather', 'Truck_Type']]),
                             columns=encoder.get_feature_names_out(['Cargo_Type', 'Weather', 'Truck_Type']))

    X = pd.concat([X.drop(['Cargo_Type', 'Weather', 'Truck_Type'], axis=1), X_encoded], axis=1)

    # Train model
    model = LinearRegression()
    model.fit(X, y)

    # Save model and encoder for reuse
    joblib.dump(model, 'transport_model.pkl')
    joblib.dump(encoder, 'encoder.pkl')

# Commented out Flask server-related code
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get data from request
#         data = request.json
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400

#         # Ensure required fields are present
#         required_fields = ['Distance_km', 'Fuel_Price_per_liter', 'Truck_Capacity_Tons', 'Driver_Experience_Years', 'Truck_Type', 'Cargo_Type', 'Weather']
#         if not all(field in data for field in required_fields):
#             return jsonify({'error': 'Missing fields'}), 400

#         # Convert data to DataFrame
#         input_data = pd.DataFrame([data])

#         # One-hot encode categorical features
#         input_data_encoded = pd.DataFrame(encoder.transform(input_data[['Cargo_Type', 'Weather', 'Truck_Type']]),
#                                           columns=encoder.get_feature_names_out(['Cargo_Type', 'Weather', 'Truck_Type']))

#         # Drop categorical columns and concatenate with encoded features
#         input_data = pd.concat([input_data.drop(['Cargo_Type', 'Weather', 'Truck_Type'], axis=1), input_data_encoded], axis=1)

#         # Predict
#         prediction = model.predict(input_data)
#         return jsonify({'predicted_amount': float(prediction[0])})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    # Check if model and encoder files exist, else train the model
    if not os.path.exists('transport_model.pkl') or not os.path.exists('encoder.pkl'):
        train_model()
    else:
        model = joblib.load('transport_model.pkl')
        encoder = joblib.load('encoder.pkl')

    # Example data
    example_data = {
        'Distance_km': 5000,
        'Fuel_Price_per_liter': 90,
        'Truck_Capacity_Tons': 15,
        'Driver_Experience_Years': 10,
        'Truck_Type': 'Small',
        'Cargo_Type': 'Perishable',
        'Weather': 'Good Weather'
    }

    # Convert data to DataFrame
    input_data = pd.DataFrame([example_data])

    # One-hot encode categorical features
    input_data_encoded = pd.DataFrame(encoder.transform(input_data[['Cargo_Type', 'Weather', 'Truck_Type']]),
                                      columns=encoder.get_feature_names_out(['Cargo_Type', 'Weather', 'Truck_Type']))

    # Drop categorical columns and concatenate with encoded features
    input_data = pd.concat([input_data.drop(['Cargo_Type', 'Weather', 'Truck_Type'], axis=1), input_data_encoded], axis=1)

    # Predict
    prediction = model.predict(input_data)
    
    # Print the predicted amount
    print(f"Predicted transportation amount: {prediction[0]}")
