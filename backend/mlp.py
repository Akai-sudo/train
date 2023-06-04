from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
# from sklearn.neural_network import MLPClassifier
# from sklearn.metrics import confusion_matrix, accuracy_score
# import sklearn.datasets as ds
# from sklearn import linear_model

from syndata import generateMoons, generateCircles, generateClass

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

# from syndata import scale_data

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

# def scale_data(data, new_limits, inplace=False ):
#     if not inplace:
#         data = data.copy()
#     min_x, min_y = np.ndarray.min(data[:,0]), np.ndarray.min(data[:,1])
#     max_x, max_y = np.ndarray.max(data[:,0]), np.ndarray.max(data[:,1])
#     min_x_new, max_x_new = new_limits[-1]
#     min_y_new, max_y_new = new_limits[1]

#     data -= np.array([min_x, min_y]) 
#     data *= np.array([(max_x_new - min_x_new) / (max_x - min_x), (max_y_new - min_y_new) / (max_y - min_y)])
#     data += np.array([min_x_new, min_y_new]) 
#     if inplace:
#         return None
#     else:
#         return data

def extract_relu_activations(epoch_activations, epoch, activations_dict):
    relu_activations = []
    if epoch not in activations_dict:
        activations_dict[epoch] = {}
    for activation in epoch_activations:
        relu_activation = np.maximum(activation, 0)
        relu_activations.append(relu_activation)
    #activations_dict[epoch] = relu_activation
    
    # Extract activation values for output layers
    output_activations = relu_activations[-1]  # Assuming output activations are the last elements
    
    activations_dict[epoch] = output_activations
    

    #return relu_activations

# def neuron_weights_callback(epoch, logs, model, weights_dict):
#     layer_index = 0
#     layer_dict = {}
#     for layer in model.layers:
#         if isinstance(layer, keras.layers.Dense):
#             weights = layer.get_weights()[0]  # Get the weight matrix of the layer
#             neuron_index = 0
#             for neuron_weights in weights.T:
#                 key = f"({layer_index}, {neuron_index})"
#                 layer_dict[key] = neuron_weights.tolist()
                
#                 neuron_index += 1
#         layer_index += 1
#     weights_dict.update({epoch:layer_dict})



# def neuron_weights_callback(epoch, logs, model, weights_dict):

#     weights = [layer.get_weights() for layer in model.layers]
#     #weights_dict[epoch] = weights
#     weights_dict.update({epoch:weights})
    # epoch = int(epoch)
    # if epoch not in weights_dict:
    #     weights_dict[epoch] = {}

    # for layer_index, layer in enumerate(model.layers):
    #     if isinstance(layer, Dense):
    #         weights = layer.get_weights()[0]  # Get the weight matrix of the layer
    #         neuron_weights = weights.T.tolist()  # Transpose and convert to a list

    #         layer_name = f"layer_{layer_index}"
    #         weights_dict[epoch][layer_name] = neuron_weights


    # for layer in model.layers:
    #     if isinstance(layer, Dense):
    #         weights = layer.get_weights()[0]  # Get the weight matrix of the layer
    #         neuron_weights_per_layer = weights.T.tolist()
    #         weights_dict[epoch].append(neuron_weights_per_layer)

#magnitude_dict = {}

def neuron_weights_callback(epoch, logs, model, magnitudes_dict, weights_dict):
    # if epoch not in magnitudes_dict:
    #     magnitudes_dict[epoch] = {}
    layer_index = 0
    for layer in model.layers:
        if isinstance(layer, Dense):
            if epoch not in magnitudes_dict:
                magnitudes_dict[epoch] = {}
            if epoch not in weights_dict:
                weights_dict[epoch] = {}
            # if layer_index not in magnitudes_dict[epoch]:
            #     magnitudes_dict[epoch][layer_index] = []

            weights = layer.get_weights()[0]
            weight_magnitudes = np.abs(weights.mean(axis=0)).tolist()

            magnitudes_dict[epoch][layer_index] = weight_magnitudes
            weights_dict[epoch][layer_index] = weights.tolist()
        layer_index += 1

# def activation_values_callback(epoch, logs, model, activations_dict, X_train):
#     # layer_index = 0
#     # #activations = []
#     # for layer in model.layers:
#     #     if isinstance(layer, Dense):
#     #         if epoch not in activations_dict:
#     #             activations_dict[epoch] = {}
            
#     #         input = layer.input
#     #         output = layer.output
#     #         activation_function = K.function([input], [output])
#     #         reshaped = np.reshape([X_train], (-1, 32))
#     #         calculate_activation = activation_function(reshaped)
#     #         #activations.append(calculate_activation)
#     #         activations_dict[epoch][layer_index] = calculate_activation
#         #layer_index += 1

#     if epoch not in activations_dict:
#         activations_dict[epoch] = {}

#     activations = []
#     for i in range(len(model.layers)):
#         layer_input = model.layers[i].input
#         layer_output = model.layers[i].output
#         activation_fn = K.function([layer_input], [layer_output])
#         train_np = np.array(X_train)
#         reshaped = train_np.reshape(-1, 32)

#         activation = activation_fn([reshaped])
#         activations.append(activation)
#         activations_dict[epoch][i] = activations

          
    # activations = []
    # for i in range(len(model.layers)):
    #     layer_input = model.layers[i].input
    #     layer_output = model.layers[i].output
    #     activation_fn = K.function([layer_input], [layer_output])
    #     activation = activation_fn([X_train])
    #     activations.append(activation)
    # layer_activations.append(activations)

    
    # currentLayer = 0
    # for layer in model.layers:
    #     if isinstance(layer, Dense):
            
    #         weights = layer.get_weights()[0]  # Get the weight matrix of the layer
    #         weights_in_layer = weights.T.tolist()
    #         #weights_dict.update({epoch:weights})
    #         # reshaped_weights = weights.T.reshape(-1)
    #         weights_dict[epoch] = weights.tolist()
    #         currentLayer += 1
    #         #neuron_index = 0
    #         # for neuron_weights in weights.T.reshape(-1):
    #         #     weights_dict[epoch].update({currentLayer, neuron_weights})
    #         #     #weights_dict[(currentLayer, neuron_index)] = neuron_weights.tolist()
                
    #         #     neuron_index += 1
    #     #currentLayer += 1

# def linearReg():
#     regression_model = linear_model.LinearRegression()
# In the neural network terminology:

# one epoch = ONE FORWARD PASS AND ONE BACKWARD PASS of all the training examples
# batch size = the number of training examples in one forward/backward pass. The higher the batch size, the more memory space you'll need.
# number of iterations = number of passes, each pass using [batch size] number of examples. To be clear, one pass = one forward pass + one backward pass (we do not count the forward pass and backward pass as two different passes).

def generateNetwork(dataset):
    max_iter = 3000
    neuron_num = 32
    network_params = {}
    currentSamples  = None
    #features_x, labels_y
    features_x = []
    labels_y = []

    #network_params_list = []; 
    if dataset == "Circles":
        #print("circles")
        samples = 500
        features_x, labels_y = generateCircles()
    elif dataset == "Moons":
        #print("moons")
        samples = 150
        features_x, labels_y = generateMoons()
    elif dataset == "Classification":
        samples = 300
        features_x, labels_y = generateClass()

    currentSamples = samples

    # if not features_x or not labels_y:
    #     # Handle the case when features_x or labels_y is empty
    #     # You can raise an exception, return an error response, or handle it in a different way based on your requirements.
    #     # For example, you can return an error message indicating that the dataset is not available.
    #     return "DATASET ERROR!"

    
    X_train, X_test, y_train, y_test = train_test_split(features_x, labels_y, train_size=0.8, test_size=0.2, random_state=42)



    model = Sequential()
    model.add(Dense(neuron_num, kernel_constraint=Between(-1,1), activation='relu', input_dim=2))
    model.add(Dense(neuron_num,kernel_constraint=Between(-1,1), activation='relu'))
    #model.add(GlobalAveragePooling1D(3)(3))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(optimizer='adam', loss='binary_crossentropy')

    # checkpoint = ModelCheckpoint(
    #     'weights-{epoch:02d}.h5',
    #     save_weights_only=True,
    #     save_freq='epoch',
    #     verbose=1
    # )

    weight_values = []
    relu_activations = []

    # def neuron_weights_callback(epoch, logs, model, weights_dict):
    #     layer_index = 0
    #     for layer in model.layers:
    #         if isinstance(layer, keras.layers.Dense):
    #             weights = layer.get_weights()[0]  # Get the weight matrix of the layer
    #             neuron_index = 0
    #             for neuron_weights in weights.T:
    #                 weights_dict[(layer_index, neuron_index)] = neuron_weights.tolist()
    #                 neuron_index += 1
    #         layer_index += 1

    #print_weights = LambdaCallback(on_epoch_end=lambda batch, logs: print(model.layers[0].get_weights()))

    weights_dict = {}
    magnitudes_dict = {}
    activations_dict = {}

    # weight_callback = LambdaCallback \
    # ( on_epoch_end=lambda epoch, logs: weights_dict.update({epoch:model.get_weights()}))

    # weight_callback = LambdaCallback(on_epoch_end=lambda epoch, logs: neuron_weights_callback(epoch, logs, model, weights_dict)
    # )

    weight_callback = LambdaCallback(on_epoch_end=lambda epoch, logs: neuron_weights_callback(epoch, logs, model, magnitudes_dict, weights_dict))
    #activation_callback = LambdaCallback(on_epoch_end=lambda epoch, logs: activation_values_callback(epoch, logs, model, activations_dict, X_train))

    #activation_callback = LambdaCallback(on_epoch_end=lambda epoch, logs: relu_activations.append(extract_relu_activations(K.function([model.layers[0].input], [model.layers[0].output])([X_train], epoch, activations_dict))))
    activation_callback = LambdaCallback(
        on_epoch_end=lambda epoch, logs: relu_activations.append(
            extract_relu_activations(
                K.function([model.layers[0].input], [model.layers[0].output])([X_train]),
                epoch,
                activations_dict
            )
        )
    )
    # scaler = MinMaxScaler(feature_range=(0, 1))
    # scaler.fit(X_train)
    # scaled_x = scaler.transform(X_train)

    epochs_num = 100 #200 dela bolš za curve od circles
    batch_size = 32

    trained_model = model.fit(X_train, y_train, batch_size=batch_size, epochs=epochs_num, callbacks=[weight_callback, activation_callback])


    loss_values = trained_model.history['loss']

    weights_array = np.array(list(weights_dict.values()))

    weight_values = np.array(weight_values, dtype=object)

    network_params['loss'] = loss_values
    network_params['all_weights'] = weights_dict
    network_params['weights'] = magnitudes_dict
    network_params['activations'] = activations_dict
    network_params['neurons'] = neuron_num
    network_params['epochs'] = epochs_num
    network_params['layers'] = (len(model.layers)-1)
 
    network_params['batches'] = currentSamples

    # num of batches is equal to number of iterations for one epoch
    
    
    dumped = json.dumps(network_params, cls=NumpyEncoder)
    return dumped
