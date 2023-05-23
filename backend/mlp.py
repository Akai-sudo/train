# frame za večnivojski perceptron
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import confusion_matrix, accuracy_score
import sklearn.datasets as ds

from sklearn import linear_model

from syndata import generateMoons, generateCircles

# from keras.models import Sequential
# from keras.layers import Dense
import keras

from keras.models import Sequential
from keras.layers import Dense
from keras.callbacks import ModelCheckpoint
#USE ONE OF THESE TO SCALE DATA
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler


from functools import partial


import pandas as pd
import json
import numpy as np

from syndata import scale_data

class NumpyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


# def getLoss(neuralnet):
#     return neuralnet.loss_


# def getBestLoss(neuralnet):
#     return neuralnet.best_loss_


# def getFeatures(neuralnet):
#     return neuralnet.n_features_in_


# weights_history = []
# loss_function = []


# def save_weights(model):
#     weights = model.coefs_
#     weights_history.append(weights)


# fit_with_logging = partial(model.fit, callback=save_weights)
# fit_with_logging(X, y)

# def linearReg():
#     regression_model = linear_model.LinearRegression()


# In the neural network terminology:

# one epoch = ONE FORWARD PASS AND ONE BACKWARD PASS of all the training examples
# batch size = the number of training examples in one forward/backward pass. The higher the batch size, the more memory space you'll need.
# number of iterations = number of passes, each pass using [batch size] number of examples. To be clear, one pass = one forward pass + one backward pass (we do not count the forward pass and backward pass as two different passes).

def generateNetwork():
    #dataset = load_digits()

    network_params = {}

    #network_params_list = []; 


    features_x, labels_y = generateMoons()

    # a to rabim - data preprocessing
    # X = dataset.iloc[:,:-1].values  #independent variable array
    # y = dataset.iloc[:,1].values  #dependent variable vector

    # res = train_test_split(data, labels, 
    #                    train_size=0.8,
    #                    test_size=0.2,
    #                    random_state=42)       
    # train_data, test_data, train_labels, test_labels = res  

    max_iter = 3000
    neuron_num = 64
    X_train, X_test, y_train, y_test = train_test_split(features_x, labels_y, train_size=0.8, test_size=0.2, random_state=42)


    #KERAS

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



    # Define your MLP model using Keras
    model = Sequential()
    model.add(Dense(neuron_num, activation='relu', input_dim=2))
    model.add(Dense(neuron_num, activation='relu'))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(optimizer='adam', loss='binary_crossentropy')

    # Set up the ModelCheckpoint callback
    # checkpoint = ModelCheckpoint(
    #     'weights-{epoch:02d}.h5',
    #     save_weights_only=True,
    #     save_freq='epoch',
    #     verbose=1
    # )

    # Create a list to store weight values at each epoch
    weight_values = []
    #dict_values = {}

    # Custom callback to store weights
    class WeightRecorderCallback(keras.callbacks.Callback):
        #counter = 0

        def on_epoch_end(self, epoch, logs=None):
            weights = self.model.get_weights()
            #dict_values[counter] = weights
            #counter = counter + 1
            weight_values.append(weights)

    #x_train, y_train = ds.make_moons(n_samples=100, shuffle=True, noise=0.03, random_state=10)

    # x_train = np.reshape(x_train, (x_train.shape[0], 2))

    scaler = MinMaxScaler(feature_range=(0, 1))
    scaler.fit(X_train)
    scaled_x = scaler.transform(X_train)
    #scaled_x = scaler.fit_transform(X_train)


    # Set up your training loop
    # x_train = ...  # Your training data
    # y_train = ...  # Your training labels
    epochs_num = 100
    batch_size = 64

    # Train the model with the callbacks
    trained_model = model.fit(scaled_x, y_train, batch_size=batch_size, epochs=epochs_num, callbacks=[WeightRecorderCallback()])

    loss_values = trained_model.history['loss']

    #loss_function = model.loss
    #print("Loss je: ", loss_values)

    weight_values = np.array(weight_values, dtype=object)

    network_params['loss'] = loss_values
    network_params['weights'] = weight_values
    network_params['neurons'] = neuron_num
    network_params['epochs'] = epochs_num
    network_params['layers'] = len(model.layers)
    network_params['batches'] = batch_size

    # Note: The number of batches is equal to number of iterations for one epoch.
    #networks_params['iter'] = 



    #sci-kit
    # MLP = MLPClassifier(hidden_layer_sizes=(neuron_num, neuron_num, neuron_num), max_iter=max_iter)
    
    # # for i in range(max_iter):
    # #     mlp.partial_fit(X, y, classes=[0, 1])
    # #     pred = mlp.predict(X)
    # #     errors.append(mean_absolute_error(y, pred))

    # MLP.fit(X_train, y_train)
        
    # y_pred = MLP.predict(X_test)
    # accuracy = accuracy_score(y_test, y_pred) * 100
    # confusion_mat = confusion_matrix(y_test, y_pred)

    # #network_params_list.append()

    # # X_train, X_test, y_train, y_test = train_test_split(features_x, labels_y, train_size=0.8, test_size=0.2, random_state=42)
    # # mlp = MLPClassifier()
    # # mlp.fit(X_train, y_train)
    
    # # y_pred = mlp.predict(X_test)
    # # accuracy = accuracy_score(y_test, y_pred) * 100
    # # confusion_mat = confusion_matrix(y_test, y_pred)
    
    # network_params['loss'] = MLP.loss_curve_ #če dam to v pd dataframe mi ustvar še indekse zravn tega
    # # network_params['weights'] = scale_data(MLP.coefs_, [(33, 88), (12, 20)], inplace=True)
    # network_params['iter'] = max_iter
    # network_params['neurons'] =  neuron_num
    
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
