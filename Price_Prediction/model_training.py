import pandas as pd
import daal4py as d4p
import numpy as np

def load_csv(file_path):
    # Load the CSV file into a pandas DataFrame
    ...

def prepare_data(data):
    # Prepare the features (X) and target (y)
    X = data.drop('Amount', axis=1)  # Adjust according to your dataset
    y = data['Amount']
    
    # Convert to NumPy arrays and ensure they are contiguous
    X = X.to_numpy(dtype=np.float64)  # Convert to float64
    y = y.to_numpy(dtype=np.float64)  # Convert to float64

    return X, y

def train_model(X, y):
    # Train the linear regression model
    lr_train = d4p.linear_regression_training()
    train_result = lr_train.compute(X, y)
    return train_result.model
