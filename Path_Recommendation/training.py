import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model

df = pd.read_csv('synthetic_southindia_routes.csv')

df['Distance'] = df['Distance'].str.replace('km', '').astype(float)
df['Intermediate Locations'] = df['Intermediate Locations'].str.strip('{}').str.split(', ')

all_locations = df['From'].tolist() + df['To'].tolist() + sum(df['Intermediate Locations'].tolist(), [])

location_encoder = LabelEncoder()
location_encoder.fit(all_locations)

df['From_encoded'] = location_encoder.transform(df['From'])
df['To_encoded'] = location_encoder.transform(df['To'])

X_from = []
X_to = []
X_intermediate = []
y_intermediate = []

for _, row in df.iterrows():
    from_encoded = row['From_encoded']
    to_encoded = row['To_encoded']
    
    for intermediate in row['Intermediate Locations']:
        intermediate_encoded = location_encoder.transform([intermediate])[0]
        
        X_from.append(from_encoded)
        X_to.append(to_encoded)
        X_intermediate.append(intermediate_encoded)
        y_intermediate.append(intermediate_encoded) 

X_from = np.array(X_from)
X_to = np.array(X_to)
X_intermediate = np.array(X_intermediate)
y_intermediate = np.array(y_intermediate)

X_combined = np.column_stack((X_from, X_to))

vocab_size = len(location_encoder.classes_)
embedding_dim = 64

model = Sequential()
model.add(Embedding(input_dim=vocab_size, output_dim=embedding_dim, input_length=2))
model.add(Dense(vocab_size, activation='softmax'))
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.fit(X_combined, y_intermediate, epochs=1, batch_size=64)

model.save('route_prediction_model.h5')

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