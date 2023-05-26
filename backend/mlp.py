from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
# from sklearn.neural_network import MLPClassifier
# from sklearn.metrics import confusion_matrix, accuracy_score
# import sklearn.datasets as ds
# from sklearn import linear_model

from syndata import generateMoons, generateCircles

from keras.constraints import Constraint
import keras.backend as K


# from keras.models import Sequential
# from keras.layers import Dense
import keras
from keras.models import Sequential
from keras.layers import Dense, GlobalAveragePooling1D, Flatten
from keras.callbacks import ModelCheckpoint
from keras.callbacks import LambdaCallback

#USE ONE OF THESE TO SCALE DATA
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler

import pandas as pd
import json
import numpy as np

from syndata import scale_data

class Between(Constraint):
    def __init__(self, min_value, max_value):
        self.min_value = min_value
        self.max_value = max_value

    def __call__(self, w):        
        return K.clip(w, self.min_value, self.max_value)

    def get_config(self):
        return {'min_value': self.min_value,
                'max_value': self.max_value}

class NumpyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


# def linearReg():
#     regression_model = linear_model.LinearRegression()
# In the neural network terminology:

# one epoch = ONE FORWARD PASS AND ONE BACKWARD PASS of all the training examples
# batch size = the number of training examples in one forward/backward pass. The higher the batch size, the more memory space you'll need.
# number of iterations = number of passes, each pass using [batch size] number of examples. To be clear, one pass = one forward pass + one backward pass (we do not count the forward pass and backward pass as two different passes).

def generateNetwork(dataset):
    max_iter = 3000
    neuron_num = 64
    network_params = {}
    #features_x, labels_y
    features_x = []
    labels_y = []

    #network_params_list = []; 
    if dataset == "circles":
        print("circles")
        features_x, labels_y = generateCircles()
    elif dataset == "moons":
        print("moons")
        features_x, labels_y = generateMoons()

    # if not features_x or not labels_y:
    #     # Handle the case when features_x or labels_y is empty
    #     # You can raise an exception, return an error response, or handle it in a different way based on your requirements.
    #     # For example, you can return an error message indicating that the dataset is not available.
    #     return "DATASET ERROR!"

    
    X_train, X_test, y_train, y_test = train_test_split(features_x, labels_y, train_size=0.8, test_size=0.2, random_state=42)


    #MLP KERAS

    # model = Sequential()
    # model.add(Dense(16, activation='relu', input_dim=input_dim))  # First hidden layer
    # model.add(Dense(16, activation='relu'))  # Second hidden layer
    # model.add(Dense(output_dim, activation='softmax'))  # Output layer

    # model = keras.Sequential(
    # [
    #     layers.Dense(2, activation="relu", name="layer1"),
    #     layers.Dense(3, activation="relu", name="layer2"),
    #     layers.Dense(4, name="layer3"),
    # ]
    # )

    model = Sequential()
    model.add(Dense(neuron_num, kernel_constraint=Between(-1,1), activation='relu', input_dim=2))
    model.add(Dense(neuron_num,kernel_constraint=Between(-1,1), activation='relu'))
    #model.add(GlobalAveragePooling1D(3)(3))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(optimizer='adam', loss='binary_crossentropy')

    # Set up the ModelCheckpoint callback
    # checkpoint = ModelCheckpoint(
    #     'weights-{epoch:02d}.h5',
    #     save_weights_only=True,
    #     save_freq='epoch',
    #     verbose=1
    # )

    weight_values = []

    #print_weights = LambdaCallback(on_epoch_end=lambda batch, logs: print(model.layers[0].get_weights()))

    weights_dict = {}

    weight_callback = LambdaCallback \
    ( on_epoch_end=lambda epoch, logs: weights_dict.update({epoch:model.get_weights()}))


    # class WeightSaveCallback(keras.callbacks.Callback):

    #     def on_epoch_end(self, epoch, logs=None):
    #         weights = self.model.get_weights()
    #         weight_values.append(weights)

    #x_train, y_train = ds.make_moons(n_samples=100, shuffle=True, noise=0.03, random_state=10)

    # x_train = np.reshape(x_train, (x_train.shape[0], 2))

    scaler = MinMaxScaler(feature_range=(0, 1))
    scaler.fit(X_train)
    scaled_x = scaler.transform(X_train)
    #scaled_x = scaler.fit_transform(X_train)


    # Set up your training loop
    # x_train = ...  # Your training data
    # y_train = ...  # Your training labels
    epochs_num = 100 #200 dela bolš za curve od circles
    batch_size = 32

    trained_model = model.fit(scaled_x, y_train, batch_size=batch_size, epochs=epochs_num, callbacks=weight_callback)

      # retrive weights
    # for epoch,weights in weights_dict.items():
    #     print("Weights for 2nd Layer of epoch #",epoch+1)
    #     print(weights[2])
    #     print("Bias for 2nd Layer of epoch #",epoch+1)
    #     print(weights[3])
    loss_values = trained_model.history['loss']

    #loss_function = model.loss
    #print("Loss je: ", loss_values)

    weight_values = np.array(weight_values, dtype=object)

    network_params['loss'] = loss_values
    network_params['weights'] = weights_dict
    network_params['neurons'] = neuron_num
    network_params['epochs'] = epochs_num
    network_params['layers'] = len(model.layers)
    network_params['batches'] = batch_size

    # num of batches is equal to number of iterations for one epoch
    
    
    dumped = json.dumps(network_params, cls=NumpyEncoder)

    #dumped = json.dumps(confusion_mat, cls=NumpyEncoder) !!!!!!!!!!!!!!! TA MI DELA

    # x_train, x_test, y_train, y_test = train_test_split(
    #     dataset.data, dataset.target, test_size=0.20, random_state=4
    # )

    ### Linear regressor
    # regressor = LinearRegression()
    # regressor.fit(x_train, y_train)
    # y_pred = regressor.predict(X_test)
    # print(y_pred)
    ### END Linear regressor

    # NN = MLPClassifier()
    # NN.fit(x_train, y_train)
    # y_pred = NN.predict(x_test)

    # attributes = {}
    # attributes = getLoss(NN)

    # accuracy = accuracy_score(y_test, y_pred) * 100
    # confusion_mat = confusion_matrix(y_test, y_pred)



    # dumped = json.dumps(confusion_mat, cls=NumpyEncoder)
    #dumped.headers.add('Access-Control-Allow-Origin', '*') 
    return dumped
