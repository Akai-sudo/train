from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from scipy.linalg import svd

from syndata import generateMoons, generateCircles, generateClass

from keras.constraints import Constraint
import keras.backend as K

from sklearn.feature_selection import SelectKBest, f_regression


from keras.models import Sequential
from keras.layers import Dense
from keras.callbacks import ModelCheckpoint
from keras.callbacks import LambdaCallback

from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler

import pandas as pd
import json
import numpy as np

import tensorly as tl
from tensorly.decomposition import tucker
from tensorly.decomposition import parafac

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

def neuron_weights_callback(epoch, logs, model, magnitudes_dict, weights_dict):
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

            
            scaler = MinMaxScaler()
            # scaler.fit(weights)
            # scaled_weights = scaler.transform(weights)
            #scaled_weights = scaler.fit_transform(weights)
            pca = PCA(n_components=1)  # Specify the desired number of components
            pca_weights = pca.fit_transform(weights)
            scaled_pca_weights = scaler.fit_transform(pca_weights)

            # weight_tensor = np.expand_dims(weights, axis=2)
            # weight_tensor = np.expand_dims(weights, axis=2)
            # rank = 10
            # factors = parafac(weight_tensor, rank=rank)
            # reconstructed_weights = tl.cp_to_tensor(factors)
            # reduced_weights = reconstructed_weights[:, :, 0]
            # rank = 3
            # core, factors = tucker(weight_tensor, rank=rank)
            # reconstructed_weight_tensor = tl.tucker_to_tensor((core, factors))
            # reconstructed_weights = reconstructed_weight_tensor[:, :, 0]
            # U, S, V = svd(weights, full_matrices=False)
            # rank = 10
            # reduced_weights = np.dot(U[:, :rank], np.dot(np.diag(S[:rank]), V[:rank, :]))
            # threshold = np.percentile(np.abs(weights), 50) 
            # pruned_weights = np.where(np.abs(weights) < threshold, 0, weights)
            # pruned_magnitudes = np.abs(pruned_weights.mean(axis=0)).tolist()

            # tsne = TSNE(n_components=3, perplexity=1)
            # reduced_weights = tsne.fit_transform(weights)
            # selector = SelectKBest(score_func=f_regression, k=10)
            # selected_weights = selector.fit_transform(weights)

            weight_magnitudes = np.abs(weights.mean(axis=0)).tolist()

            magnitudes_dict[epoch][layer_index] = weight_magnitudes
            weights_dict[epoch][layer_index] = scaled_pca_weights.tolist()
            # weights_dict[epoch][layer_index] = weights.tolist()
            # weights_dict[epoch][layer_index] = pruned_magnitudes
            # weights_dict[epoch][layer_index] = weights.flatten().tolist()
        layer_index += 1

def activation_callback(epoch, model, inputs, layer_indices, get_activations, pca_dict):
    activations = []
    activations.append(
            [layer.output for layer_idx, layer in enumerate(model.layers) if layer_idx in layer_indices]
    )
    activations = get_activations([inputs])

    pca_activations = []
    for activation in activations:
        pca = PCA(n_components=1)
        pca_result = pca.fit_transform(activation)
        pca_activations.append(pca_result)

    pca_dict[epoch] = pca_activations


# In the neural network terminology:
# one epoch = ONE FORWARD PASS AND ONE BACKWARD PASS of all the training examples
# batch size = the number of training examples in one forward/backward pass. The higher the batch size, the more memory space you'll need.
# number of iterations = number of passes, each pass using [batch size] number of examples. To be clear, one pass = one forward pass + one backward pass (we do not count the forward pass and backward pass as two different passes).
def generateNetwork(dataset):
    max_iter = 3000
    neuron_num = 32
    network_params = {}
    currentSamples  = None
    features_x = []
    labels_y = []

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


    X_train, X_test, y_train, y_test = train_test_split(features_x, labels_y, train_size=0.8, test_size=0.2, random_state=42)

    model = Sequential()
    model.add(Dense(neuron_num, activation='relu', input_dim=2))
    model.add(Dense(neuron_num, activation='relu'))
    model.add(Dense(1, activation='sigmoid'))

    model.compile(optimizer='adam', loss='binary_crossentropy')

    weight_values = []
    weights_dict = {}
    magnitudes_dict = {}
    pca_dict = {}

    weight_callback = LambdaCallback(on_epoch_end=lambda epoch, logs: neuron_weights_callback(epoch, logs, model, magnitudes_dict, weights_dict))

    layer_indices = [0,1,2]
    get_activations = K.function([model.input], [layer.output for layer in model.layers])

    pca_callback = LambdaCallback(on_epoch_end=lambda epoch, logs: activation_callback(epoch, model, X_train, layer_indices, get_activations, pca_dict))
    # activation_callback = LambdaCallback(
    # on_epoch_end=lambda epoch, logs: activations.append(
    #     [layer.output for layer_idx, layer in enumerate(model.layers) if layer_idx in layer_indices]
    #     )
    # )
    # inputs = X_train
    # # extracta output activations
    # get_activations = K.function([model.input], [layer.output for layer in model.layers])
    # # Aktivacije outputov
    # activations = get_activations([inputs])
    # #generiraj PCA variance aktivacij
    # pca_activations = []
    # activation_idx = 0
    # for activation in activations:
    #     #num_components = min(activation.shape[1], 2)  
    #     # if activation_idx < 2:
    #     pca = PCA(n_components=1)
    #     pca_result = pca.fit_transform(activation)
    #     pca_activations.append( pca_result)
    #     # activation_idx += 1

    # scaler = MinMaxScaler(feature_range=(0, 1))
    # scaler.fit(X_train)
    # scaled_x = scaler.transform(X_train)

    epochs_num = 100 #200 dela bolš za curve od circles
    batch_size = 32 # num of batches is equal to number of iterations for one epoch

    trained_model = model.fit(X_train, y_train, batch_size=batch_size, epochs=epochs_num, callbacks=[weight_callback, pca_callback])

    # loss, accuracy = model.evaluate(X_train, y_test)

    loss_values = trained_model.history['loss']
    # accuracy = trained_model.history['accuracy']

    weights_array = np.array(list(weights_dict.values()))

    weight_values = np.array(weight_values, dtype=object)

    network_params['loss'] = loss_values
    network_params['all_weights'] = weights_dict
    network_params['weights'] = magnitudes_dict
    network_params['activations'] = pca_dict
    network_params['neurons'] = neuron_num
    network_params['epochs'] = epochs_num
    network_params['layers'] = (len(model.layers)-1)
    network_params['batches'] = currentSamples

    
    dumped = json.dumps(network_params, cls=NumpyEncoder)
    return dumped
