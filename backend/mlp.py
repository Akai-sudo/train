#from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.manifold import Isomap
from scipy.linalg import svd

from keras.layers import LayerNormalization

from syndata import generateMoons, generateCircles, generateClass

from keras.constraints import Constraint
import keras.backend as K


from keras.models import Sequential
from keras.layers import Dense
from keras.callbacks import ModelCheckpoint
from keras.callbacks import LambdaCallback

from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler

import pandas as pd
import json
import numpy as np

# import tensorly as tl
# from tensorly.decomposition import tucker
# from tensorly.decomposition import parafac

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
    isomap_result = []
    for layer in model.layers:
        print("\n Layer: ", layer_index)
        if isinstance(layer, Dense):
            if epoch not in magnitudes_dict:
                magnitudes_dict[epoch] = {}
            if epoch not in weights_dict:
                weights_dict[epoch] = {}
            # if layer_index not in magnitudes_dict[epoch]:
            #     magnitudes_dict[epoch][layer_index] = []

            #pridobljene utezi
            weights = layer.get_weights()[0]

            scaler = MinMaxScaler()
            # scaled_weights = scaler.fit_transform(weights)

            #magnitude dobljenit utezi v LIST, HEATMAP
            weight_magnitudes = np.abs(weights.mean(axis=0)).tolist()   

            #vsota uteži trenutnega nevrona, OZVEZDJE
            weighted_sum = np.sum(weights, axis=0)

            #povprečna vsota uteži nevrona, prvi layer ima uteži blizu 0, OZVEZDJE
            if layer_index != 0:
                weighted_sum = weighted_sum / 32

            reshaped_sum = np.array(weighted_sum).reshape(-1, 1)

            scaled_sums = scaler.fit_transform(reshaped_sum)
            
            # print("\n Weighted avg sum: ", weight_sum_avg)

            # print("\nLayer: ", layer_index)
            # print("\nShape: ", weights.shape)
            # print("\n")
            
            #print("W",weights.shape)
            # scaler = MinMaxScaler()
            # scaled_weights = scaler.fit_transform(weights)
            # pca = PCA(n_components=1)
            # pca_weights = pca.fit_transform(weights)
            # scaled_pca_weights = scaler.fit_transform(pca_weights)


            # if weights.shape[0] > 2:
            #     n_components = 3
            #     n_neighbors = 16

            #     isomap = Isomap(n_neighbors=n_neighbors, n_components=n_components)
            #     isomap_result = isomap.fit_transform(scaled_weights)

            #     x = isomap_result[:, 0]
            #     y = isomap_result[:, 1]
            #     z = isomap_result[:, 2]

            #     fig = plt.figure()
            #     ax = fig.add_subplot(111, projection='3d')
            #     ax.scatter(x, y, z)
            #     ax.set_xlabel('Component 1')
            #     ax.set_ylabel('Component 2')
            #     ax.set_zlabel('Component 3')
            #     # plt.show()
            #     plt.savefig('iso.png')



            # all_matrices.append(weights_scaled.flatten())

            # n_samples = weights_scaled.shape[0]
            # if n_samples >= 5:
            #     isomap = Isomap(n_neighbors=5, n_components=3)
            #     isomap_result = isomap.fit_transform(weights_scaled)
                
            #     magnitudes_dict[epoch][layer_index] = isomap_result.tolist()
            # else:
            #     print("Insufficient data dimensions for Isomap.")

            # isomap = Isomap(n_neighbors=5, n_components=3)
            # isomap_result = isomap.fit_transform(weights_scaled)

            #weights_scaled_transposed = weights_scaled.T #transponiraj pred isomapom
            # print("W scaled", weights_scaled.shape)

            # tsne = TSNE(n_components=3, perplexity=5, random_state=42)
            # tsne_weights = tsne.fit_transform(weights_scaled)

            # weight_magnitudes = np.abs(weights.mean(axis=0)).tolist()

            # magnitude_array = np.array(weight_magnitudes)

            # n_components = 3
            # isomap = Isomap(n_neighbors=5, n_components=n_components)
            # isomap_result = isomap.fit_transform(weights_scaled_transposed)


            # print("W scaled magnitudes", len(weight_magnitudes))

            # magnitudes_dict[epoch][layer_index] = weight_magnitudes
            # weights_dict[epoch][layer_index] = tsne_weights.tolist()

            # scaler.fit(weights)
            # scaled_weights = scaler.transform(weights)
            #scaled_weights = scaler.fit_transform(weights)

            
            # pca = PCA(n_components=3)  #tole ni kul, more bit 3 namest enke

            # pca = PCA(n_components = "mle", svd_solver ="full")

            #tole rabm sprement tko da  bom dubu povprecja? magnitudov od uteži od vseh nevronov 1-32
            # pca_weights = pca.fit_transform(weights)
            # scaled_pca_weights = scaler.fit_transform(pca_weights)


            # weight_magnitudes = np.abs(weights.mean(axis=0)).tolist()

            #magnitudes dict je za space vizualisation
            # magnitudes_dict[epoch][layer_index] = isomap_result.tolist()

            # weight_magnitudes = np.abs(weights.mean(axis=0)).tolist()

            magnitudes_dict[epoch][layer_index] = weight_magnitudes  #ni treba to list, sem že prej, heatmap
            # weights_dict[epoch][layer_index] = isomap_result #namest scaled pca weights
            weights_dict[epoch][layer_index] = scaled_sums #ozvezdje
            # magnitudes_dict[epoch][layer_index] = weight_magnitudes
            # weights_dict[epoch][layer_index] = scaled_pca_weights.tolist()
            # weights_dict[epoch][layer_index] = weights.tolist()
            # weights_dict[epoch][layer_index] = pruned_magnitudes
            # weights_dict[epoch][layer_index] = weights.flatten().tolist()
        layer_index += 1
    # stacked = np.vstack(all_matrices)

    # isomap = Isomap(n_neighbors=5, n_components=3)
    # isomap_result = isomap.fit_transform(stacked)
    # magnitudes_dict[epoch][layer_index] = isomap_result.tolist()

def activation_callback(epoch, model, inputs, layer_indices, get_activations, pca_dict):
    activations = []
    activations.append(
            [layer.output for layer_idx, layer in enumerate(model.layers) if layer_idx in layer_indices]
    )
    activations = get_activations([inputs])

    pca_activations = []
    for activation in activations:
        pca = PCA(n_components=1) #tole je OK
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
    network_params['all_weights'] = weights_dict #ozvezdje
    network_params['weights'] = magnitudes_dict #heatmap
    network_params['activations'] = pca_dict
    network_params['neurons'] = neuron_num
    network_params['epochs'] = epochs_num
    network_params['layers'] = (len(model.layers)-1)
    network_params['batches'] = currentSamples

    
    dumped = json.dumps(network_params, cls=NumpyEncoder)
    return dumped
