from sklearn.metrics import mean_squared_error, r2_score

def evaluate_model(y_true, y_pred):
    """
    Evaluates the performance of the model using MSE and R².
    :param y_true: numpy array, true target values
    :param y_pred: numpy array, predicted target values
    :return: tuple, MSE and R² score
    """
    # Calculate Mean Squared Error and R² Score
    mse = mean_squared_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)

    return mse, r2
