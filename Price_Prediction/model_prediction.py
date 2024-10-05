import daal4py as d4p
import numpy as np
import pandas as pd


def predict(new_data, trained_model):
    """
    Predicts the amount using the trained model and new data.
    :param new_data: pandas DataFrame, new input data for prediction
    :param trained_model: trained model from linear regression training
    :return: numpy array, predictions for the input data
    """
    # Ensure new_data is encoded the same way as the training data
    new_data_encoded = encode_categorical_data(new_data)
    
    # Prepare feature matrix
    X_new = new_data_encoded.drop('Amount', axis=1).values  # Assuming 'Amount' is not in new_data
    X_new = np.array(X_new, dtype=np.float64)  # Convert to float64

    # Make predictions
    prediction_result = d4p.linear_regression_prediction().compute(X_new, trained_model)
    
    return prediction_result.prediction

def encode_categorical_data(data):
    """
    Encodes categorical columns using one-hot encoding and returns the updated dataframe.
    :param data: pandas DataFrame
    :return: pandas DataFrame with categorical data encoded
    """
    categorical_columns = ['Cargo_Type', 'Weather']
    data_encoded = pd.get_dummies(data, columns=categorical_columns, drop_first=True)
    return data_encoded
